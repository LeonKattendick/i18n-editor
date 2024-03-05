<script lang="ts">
  import { CirclePlusSolid } from 'flowbite-svelte-icons';
  import type { Project, TranslationWithItems } from './Editor.svelte';

  let { project, translationsWithItems, selectedTranslation } = $props<{
    project: Project;
    translationsWithItems: TranslationWithItems[];
    selectedTranslation?: TranslationWithItems;
  }>();
</script>

<div class="w-[25%] border-r border-r-borderColor p-4 overflow-y-auto relative">
  <ul>
    {#each translationsWithItems as translation}
      <li>{translation.id}</li>
    {/each}
  </ul>
  <button class="absolute top-2 right-2"><CirclePlusSolid class="text-success" size="xl" /></button>
</div>
