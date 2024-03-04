<script lang="ts">
  import { goto } from '$app/navigation';
  import type { Project } from '@prisma/client';
  import { FolderPlusSolid } from 'flowbite-svelte-icons';

  const { project, isNew } = $props<{ project?: Project; isNew?: boolean }>();

  const flags = $derived.by(() => {
    if (!project) return [];
    return project.locales.map((v) => (v.includes('_') ? v.split('_')[1] : v)).splice(0, 5);
  });

  const handleClick = () => {
    if (isNew) {
    } else {
      goto(`/editor?id=${project?.id}`);
    }
  };
</script>

<button
  class="border border-borderColor bg-backgroundSecondary rounded px-4 py-1 h-[100px] text-left"
  on:click={handleClick}
>
  {#if isNew}
    <div class="flex justify-center items-center gap-2">
      <FolderPlusSolid class="text-green-500" size="xl" />
      <span class="text-xl font-bold">Neues Projekt</span>
    </div>
  {:else if project}
    <span class="text-xl font-bold border-b border-b-borderColor pb-1 mb-2 block">{project.name}</span>
    <div class="flex gap-2 items-end">
      {#each flags as flag}
        <img src={`https://flagsapi.com/${flag}/flat/32.png`} alt={flag} />
      {/each}
      {#if flags.length < project.locales.length}
        ...
      {/if}
    </div>
  {/if}
</button>
