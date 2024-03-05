<script lang="ts" context="module">
  export type Project = {
    id: number;
    createdBy: string;
    name: string;
    locales: string[];
  };
  export type TranslationWithItems = {
    id: number;
    projectId: number;
    key: string;
    items: TranslationItem[];
  };
  export type TranslationItem = {
    id: number;
    translationId: number;
    content: string;
  };
</script>

<script lang="ts">
  import ScrollPanel from './ScrollPanel.svelte';
  import TranslationPanel from './TranslationPanel.svelte';

  let { project, translationsWithItems } = $props<{
    project: Project;
    translationsWithItems: TranslationWithItems[];
  }>();

  let selectedTranslation = $state<TranslationWithItems>();
</script>

<div class="flex h-full bg-backgroundSecondary rounded border border-borderColor">
  <ScrollPanel bind:project bind:translationsWithItems bind:selectedTranslation />
  <TranslationPanel bind:translation={selectedTranslation} />
</div>
