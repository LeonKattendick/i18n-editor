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
    id: number | undefined;
    translationId: number;
    locale: string;
    content: string;
  };
</script>

<script lang="ts">
  import Loading from '../Loading.svelte';
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
  {#if selectedTranslation}
    {#key selectedTranslation}
      <TranslationPanel bind:project bind:translation={selectedTranslation} />
    {/key}
  {:else}
    <Loading>Wähle einen Übersetzungschlüssel aus</Loading>
  {/if}
</div>
