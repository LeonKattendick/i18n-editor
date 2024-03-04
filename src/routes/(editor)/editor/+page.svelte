<script lang="ts">
  import Loading from '$lib/components/Loading.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>i18n-editor :: Editor</title>
</svelte:head>

{#if data.noParameter}
  <Loading>Bitte wähle ein Projekt auf der 'Meine Projekte' Seite aus</Loading>
{:else if data.notFound}
  <Loading>Das Projekt konnte nicht geöffnet werden!</Loading>
{:else}
  test
{/if}
