<script lang="ts">
  import type { Project, TranslationWithItems } from '$lib/util/types';
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
    <TranslationPanel bind:project bind:translation={selectedTranslation} />
  {:else}
    <Loading>Wähle einen Übersetzungschlüssel aus</Loading>
  {/if}
</div>
