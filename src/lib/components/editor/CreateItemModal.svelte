<script lang="ts">
  import type { TranslationWithItems } from '$lib/util/types';
  import type { Project, Translation } from '@prisma/client';
  import classnames from 'classnames';
  import Modal from '../Modal.svelte';

  let { modalVisible, project, translationsWithItems, selectedTranslation } = $props<{
    modalVisible: boolean;
    project: Project;
    translationsWithItems: TranslationWithItems[];
    selectedTranslation?: TranslationWithItems;
  }>();

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
