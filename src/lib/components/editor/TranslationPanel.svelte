<script lang="ts">
  import classnames from 'classnames';
  import type { Project, TranslationItem, TranslationWithItems } from './Editor.svelte';

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
      changedTranslations[index].content = newText;
    } else {
      changedTranslations.push({
        id: locale.item?.id,
        content: newText,
        locale: locale.name,
        translationId: translation.id,
      });
    }
    console.log(changedTranslations[0]);
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
        value={locale.item?.content}
        on:input={(e) => handleChange(locale, e.currentTarget.value)}
      />
      <button
        class={classnames(
          'rounded py-0.5 px-2 duration-200',
          changedTranslations.find((v) => v.locale === locale.name)
            ? 'bg-primary border border-primary'
            : 'border border-borderColor',
        )}
      >
        Speichern
      </button>
      <button><img src="/deepl.png" alt="" width="32" title="Mit DeepL übersetzen" /></button>
    </div>
  {/each}
</div>
