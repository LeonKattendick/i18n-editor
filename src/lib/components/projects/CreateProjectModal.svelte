<script lang="ts">
  import { goto } from '$app/navigation';
  import Modal from '$lib/components/Modal.svelte';
  import { variables } from '$lib/util/variables';
  import classnames from 'classnames';

  let { modalVisible } = $props<{ modalVisible: boolean }>();

  let modalName = $state('');
  let modalLocales = $state<'' | string[]>('');
  let modalError = $state('');

  const handleCancel = () => {
    modalName = '';
    modalLocales = [];
    modalError = '';
    modalVisible = false;
  };

  const handleCreate = async () => {
    const result = await fetch('/api/project', {
      method: 'post',
      body: JSON.stringify({ name: modalName, locales: modalLocales }),
    });
    const jsonData = await result.json();
    if (Object.hasOwn(jsonData, 'message')) {
      modalError = (jsonData as any).message;
      return;
    }

    localStorage.setItem(variables.openProjectIdStorageName, jsonData.id);
    goto(`/editor?id=${jsonData.id}`);
    handleCancel();
  };
</script>

<Modal bind:visible={modalVisible} title="Projekt erstellen" onCancel={handleCancel} onSave={handleCreate}>
  <input
    class={classnames(
      'bg-transparent border-b border-b-borderColor w-full outline-none pl-1',
      modalError && 'border-b-error placeholder:text-error',
    )}
    minlength="1"
    placeholder="Name des Projekts eingeben"
    bind:value={modalName}
  />
  <select
    class={classnames(
      'bg-transparent border-b border-b-borderColor w-full outline-none mt-4',
      modalLocales === '' && (modalError ? 'border-b-error text-error' : 'text-gray-400'),
    )}
    bind:value={modalLocales}
  >
    <option value="" disabled hidden selected>Sprachen des Projekts auswählen </option>
    <option value={['de_AT', 'en_GB']} style="color: black">Deutsch, Englisch</option>
    <option value={['de_AT', 'en_GB', 'fr_FR']} style="color: black">Deutsch, Englisch, Französisch</option>
    <option value={['de_AT', 'en_GB', 'fr_FR', 'es_ES']} style="color: black">
      Deutsch, Englisch, Französisch, Spanisch
    </option>
    <option value={['de_AT', 'zh_CN']} style="color: black">Deutsch, Chinesisch</option>
    <option value={['de_AT', 'zh_CN', 'ko_KR']} style="color: black">Deutsch, Chinesisch, Koreanisch</option>
    <option value={['de_AT', 'en_GB', 'fr_FR', 'es_ES', 'zh_CN', 'ko_KR']} style="color: black">
      Deutsch, Englisch, Französisch, Spanisch, Chinesisch, Koreanisch
    </option>
  </select>
  {#if modalError}
    <div class="text-error text-sm font-bold mt-2">{modalError}</div>
  {/if}
</Modal>
