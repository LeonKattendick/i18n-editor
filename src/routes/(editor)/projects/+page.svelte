<script lang="ts">
  import Loading from '$lib/components/Loading.svelte';
  import CreateProjectModal from '$lib/components/projects/CreateProjectModal.svelte';
  import Project from '$lib/components/projects/Project.svelte';

  let { data } = $props();

  let modalVisible = $state(false);
</script>

<svelte:head>
  <title>i18n-editor :: Projekte</title>
</svelte:head>

{#await data.projectsPromise}
  <Loading>Lade Projekte...</Loading>
{:then projects}
  <CreateProjectModal bind:modalVisible />
  <div class="grid grid-cols-6 gap-4">
    {#each projects as project}
      <Project {project} />
    {/each}
    <Project isNew createNew={() => (modalVisible = true)} />
  </div>
{:catch _}
  <Loading>Es ist ein unterwarter Fehler aufgetreten!</Loading>
{/await}
