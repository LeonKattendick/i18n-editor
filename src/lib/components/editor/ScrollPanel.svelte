<script lang="ts">
  import classnames from 'classnames';
  import { CirclePlusSolid } from 'flowbite-svelte-icons';
  import type { Project, TranslationWithItems } from './Editor.svelte';

  let { project, translationsWithItems, selectedTranslation } = $props<{
    project: Project;
    translationsWithItems: TranslationWithItems[];
    selectedTranslation?: TranslationWithItems;
  }>();
</script>

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
  <button class="absolute top-2 right-2" title="Neuen Schlüssel anlegen">
    <CirclePlusSolid class="text-success" size="xl" />
  </button>
</div>
