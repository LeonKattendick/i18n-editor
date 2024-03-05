<script lang="ts" context="module">
  export type Project = {
    id: number;
    createdBy: string;
    name: string;
    locales: string[];
  };
</script>

<script lang="ts">
  import ScrollPanel from './ScrollPanel.svelte';
  import TranslationPanel from './TranslationPanel.svelte';

  let { project } = $props<{ project: Project }>();
</script>

<div class="flex h-full bg-backgroundSecondary rounded border border-borderColor">
  <ScrollPanel bind:project />
  <TranslationPanel bind:project />
</div>
