<script lang="ts">
  import Loading from '$lib/components/Loading.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>i18n-editor :: Projekte</title>
</svelte:head>

{#await data.slimProjectsPromise}
  <Loading>Lade Projekte...</Loading>
{:then slimProjects}
  {#each slimProjects as project}
    <div>{project.id}</div>
  {/each}
{/await}
