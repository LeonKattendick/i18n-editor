<script lang="ts">
  import { downloadTranslationFiles } from '$lib/services/downloadService';
  import type { TranslationWithItems } from '$lib/util/types';
  import type { Project } from '@prisma/client';
  import classnames from 'classnames';
  import { CirclePlusSolid, DownloadSolid } from 'flowbite-svelte-icons';
  import CreateItemModal from './CreateItemModal.svelte';

  let { project, translationsWithItems, selectedTranslation } = $props<{
    project: Project;
    translationsWithItems: TranslationWithItems[];
    selectedTranslation?: TranslationWithItems;
  }>();

  let modalVisible = $state(false);
</script>

<CreateItemModal bind:modalVisible bind:project bind:translationsWithItems bind:selectedTranslation />
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
  <button
    class="absolute bottom-2 right-2"
    title="Übersetzungen herunterladen"
    on:click={() => downloadTranslationFiles(project, translationsWithItems)}
  >
    <DownloadSolid class="text-primary" size="xl" />
  </button>
</div>
