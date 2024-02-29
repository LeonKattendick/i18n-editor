<script lang="ts" context="module">
  export const supportedThemes = ['light', 'dark'];
</script>

<script lang="ts">
  import { fly } from 'svelte/transition';

  let { theme } = $props<{ theme: string }>();

  function toggleTheme() {
    const currentIndex = supportedThemes.indexOf(theme);
    theme = supportedThemes[(currentIndex + 1) % supportedThemes.length];
  }

  let icon = $derived.by(() => {
    if (theme === 'light') return '🌞';
    if (theme === 'dark') return '🌙';
  });
</script>

{#key theme}
  <button transition:fly={{ x: 100 }} on:click={toggleTheme} class="text-3xl fixed right-2 bottom-2">{icon}</button>
{/key}
