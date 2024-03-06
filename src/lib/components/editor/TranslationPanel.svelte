<script lang="ts">
  import type { Project, TranslationItem, TranslationWithItems } from '$lib/util/types';
  import classnames from 'classnames';

  let { project, translation } = $props<{ project: Project; translation: TranslationWithItems }>();

  const localesWithFlagAndItem = $derived.by(() => {
    if (!project) return [];
    return project.locales.map((v) => ({
      name: v,
      flag: v.includes('_') ? v.split('_')[1] : v,
      item: translation?.items.find((w) => v === w.locale),
    }));
  });

  let changedTranslations = $state<TranslationItem[]>([]);

  const handleChange = (locale: { name: string; item?: TranslationItem }, newText: string) => {
    const existingChange = changedTranslations.find((v) => v.locale === locale.name);

    if (existingChange) {
      const index = changedTranslations.indexOf(existingChange);

      const uploadedChange = translation.items.find((v) => v.id === existingChange.id);
      if ((!uploadedChange && newText === '') || uploadedChange?.content === newText) {
        changedTranslations = changedTranslations.filter((_, i) => index !== i);
      } else {
        changedTranslations[index].content = newText;
      }
    } else {
      changedTranslations = [
        ...changedTranslations,
        {
          id: locale.item?.id,
          content: newText,
          locale: locale.name,
          translationId: translation.id,
        },
      ];
    }
  };

  const handleTranslate = async (locale: { name: string; item?: TranslationItem }) => {
    const content =
      changedTranslations.find((v) => !!v.content && v.locale !== locale.name)?.content ||
      translation.items.find((v) => !!v.content && v.locale !== locale.name)?.content;
    if (!content) return;

    const result = await fetch('/api/translate', {
      method: 'post',
      body: JSON.stringify({ locale: locale.name, content }),
    });
    const jsonData = await result.json();
    handleChange(locale, jsonData);
  };

  const handleSave = async (locale: string) => {
    const newItem = changedTranslations.find((v) => v.locale === locale);
    if (!newItem) return;

    const isDelete = newItem.id && newItem.content === '';
    if (isDelete) return handleDelete(newItem);

    const result = await fetch('/api/translation-item', {
      method: newItem.id ? 'put' : 'post',
      body: JSON.stringify(newItem),
    });
    const jsonData = await result.json();

    const originalItem = translation.items.find((v) => v.locale === locale);
    if (originalItem) {
      const index = translation.items.indexOf(originalItem);
      translation.items[index] = jsonData;
    } else {
      translation.items = [...translation.items, jsonData];
    }

    changedTranslations = changedTranslations.filter((v) => v.locale !== newItem.locale);
  };

  const handleDelete = async (newItem: TranslationItem) => {
    await fetch('/api/translation-item', {
      method: 'delete',
      body: JSON.stringify(newItem.id),
    });

    translation.items = translation.items.filter((v) => v.locale !== newItem.locale);
    changedTranslations = changedTranslations.filter((v) => v.locale !== newItem.locale);
  };
</script>

<div class="flex flex-col gap-6 w-full p-4">
  {#each localesWithFlagAndItem as locale}
    <div class="flex items-center gap-4">
      <img src={`https://flagsapi.com/${locale.flag}/flat/32.png`} alt={locale.flag} />
      <input
        type="text"
        class="flex-1 outline-none border-b border-b-borderColor bg-transparent"
        placeholder={`Gib die Übersetzung von '${translation.key}' für ${locale.name} ein`}
        value={changedTranslations.find((v) => v.locale === locale.name)?.content ?? locale.item?.content ?? ''}
        on:input={(e) => handleChange(locale, e.currentTarget.value)}
      />
      <button
        class={classnames(
          'rounded py-0.5 px-2 duration-200',
          changedTranslations.find((v) => v.locale === locale.name)
            ? 'bg-primary border border-primary text-neutral-50'
            : 'border border-borderColor',
        )}
        disabled={!changedTranslations.find((v) => v.locale === locale.name)}
        on:click={() => handleSave(locale.name)}
      >
        Speichern
      </button>
      {#if changedTranslations.filter((v) => v.locale !== locale.name).length > 0 || translation.items.filter((v) => v.locale !== locale.name).length > 0}
        <button on:click={() => handleTranslate(locale)}>
          <img src="/deepl.png" alt="" width="32" title="Mit DeepL übersetzen" />
        </button>
      {:else}
        <img
          src="/deepl.png"
          alt=""
          width="32"
          title="Übersetzung nocht nicht verfügbar"
          class="grayscale opacity-50"
        />
      {/if}
    </div>
  {/each}
</div>
