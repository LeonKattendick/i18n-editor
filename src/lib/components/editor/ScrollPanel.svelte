<script lang="ts">
  import type { TranslationWithItems } from '$lib/util/types';
  import type { Project, Translation } from '@prisma/client';
  import classnames from 'classnames';
  import { CirclePlusSolid } from 'flowbite-svelte-icons';
  import Modal from '../Modal.svelte';

  let { project, translationsWithItems, selectedTranslation } = $props<{
    project: Project;
    translationsWithItems: TranslationWithItems[];
    selectedTranslation?: TranslationWithItems;
  }>();

  let modalVisible = $state(false);
  let modalKey = $state('');
  let modalError = $state('');

  const handleCancel = () => {
    modalVisible = false;
    modalKey = '';
    modalError = '';
  };

  const handleCreate = async () => {
    const result = await fetch('/api/translation', {
      method: 'post',
      body: JSON.stringify({ projectId: project.id, key: modalKey }),
    });
    const jsonData = (await result.json()) as Translation | { message: string };
    if (Object.hasOwn(jsonData, 'message')) {
      modalError = (jsonData as any).message;
      return;
    }

    const translation = { ...(jsonData as Translation), items: [] };
    translationsWithItems = [...translationsWithItems, translation];
    selectedTranslation = translation;

    handleCancel();
  };
</script>

<Modal bind:visible={modalVisible} onCancel={handleCancel} onSave={handleCreate} title="Neuen Schlüssel anlegen">
  <input
    class={classnames(
      'bg-transparent border-b border-b-borderColor w-full outline-none',
      modalError && 'border-b-error placeholder:text-error',
    )}
    placeholder="Name des neuen Schlüssels eingeben (z. B test.key.first)"
    bind:value={modalKey}
  />
  {#if modalError}
    <div class="text-error text-sm font-bold mt-2">{modalError}</div>
  {/if}
</Modal>
<div class="w-[30%] border-r border-r-borderColor p-4 overflow-y-auto relative">
  <ul>
    {#each translationsWithItems as translation}
      <li
        class={classnames(
          'px-2 my-1',
          selectedTranslation?.id === translation.id
            ? 'font-semibold border-l border-l-borderColor'
            : 'border-l border-l-backgroundSecondary',
        )}
      >
        <button on:click={() => (selectedTranslation = translation)}>{translation.key}</button>
      </li>
    {/each}
  </ul>
  <button class="absolute top-2 right-2" title="Neuen Schlüssel anlegen" on:click={() => (modalVisible = true)}>
    <CirclePlusSolid class="text-success" size="xl" />
  </button>
</div>
