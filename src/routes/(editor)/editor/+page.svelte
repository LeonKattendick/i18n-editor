<script lang="ts">
  import { goto } from '$app/navigation';
  import Loading from '$lib/components/Loading.svelte';
  import Editor from '$lib/components/editor/Editor.svelte';
  import { variables } from '$lib/util/variables.js';

  let { data } = $props();

  $effect(() => {
    const projectId = localStorage.getItem(variables.openProjectIdStorageName);
    if (projectId) goto(`/editor?id=${projectId}`);
  });
</script>

<svelte:head>
  <title>i18n-editor :: Editor</title>
</svelte:head>

{#if data.noParameter}
  <Loading>Bitte wähle ein Projekt auf der 'Meine Projekte' Seite aus</Loading>
{:else if data.notFound}
  <Loading>Das Projekt konnte nicht geöffnet werden!</Loading>
{:else}
  <Editor project={data.project!} />
{/if}
