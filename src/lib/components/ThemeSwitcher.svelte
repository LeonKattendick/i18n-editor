<script lang="ts" context="module">
  export const supportedThemes = ['light', 'dark'];
</script>

<script lang="ts">
  import { fly } from 'svelte/transition';

  const { theme } = $props<{ theme: string }>();

  let icon = $derived.by(() => {
    if (theme === 'light') return '🌞';
    if (theme === 'dark') return '🌙';
  });
</script>

<form action="/?/theme" method="post">
  <button transition:fly={{ x: 100 }} class="text-3xl fixed right-2 bottom-3">{icon}</button>
</form>
