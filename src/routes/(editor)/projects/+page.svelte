<script lang="ts">
  import Loading from '$lib/components/Loading.svelte';
  import Project from '$lib/components/projects/Project.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>i18n-editor :: Projekte</title>
</svelte:head>

{#await data.projectsPromise}
  <Loading>Lade Projekte...</Loading>
{:then projects}
  <div class="grid grid-cols-6 gap-4">
    {#each projects as project}
      <Project {project} />
    {/each}
    <Project isNew />
  </div>
{/await}
