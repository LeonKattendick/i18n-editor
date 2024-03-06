<script lang="ts">
  import type { Snippet } from 'svelte';

  let { visible, title, children, onCancel, onSave } = $props<{
    visible: boolean;
    title: string;
    children: Snippet;
    onCancel?: () => void;
    onSave?: () => void;
  }>();
</script>

{#if visible}
  <div class="fixed bg-opacity-50 bg-black w-screen h-screen top-0 left-0 flex justify-center items-center z-10">
    <div class="bg-backgroundSecondary rounded border border-borderColor min-w-[30%]">
      <div class="border-b border-b-borderColor font-bold text-xl p-4">{title}</div>
      <div class="px-4 py-8">{@render children()}</div>
      <div class="flex justify-end items-center gap-2 p-4 text-neutral-50">
        <button class="bg-error rounded py-1 px-2" on:click={onCancel}>Abbrechen</button>
        <button class="bg-primary rounded py-1 px-2" on:click={onSave}>Speichern</button>
      </div>
    </div>
  </div>
{/if}
