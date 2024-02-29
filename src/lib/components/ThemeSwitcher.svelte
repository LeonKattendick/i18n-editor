<script lang="ts" context="module">
  export const supportedThemes = ['light', 'dark'];
</script>

<script lang="ts">
  import { fly } from 'svelte/transition';

  let { theme } = $props<{ theme: string }>();

  let icon = $derived.by(() => {
    if (theme === 'light') return '🌞';
    if (theme === 'dark') return '🌙';
  });

  $effect(() => {
    const selectedTheme = localStorage.getItem('selectedTheme');
    if (!!selectedTheme) theme = selectedTheme;
  });

  const changeTheme = () => {
    const currentIndex = supportedThemes.indexOf(theme);
    theme = supportedThemes[(currentIndex + 1) % supportedThemes.length];
    localStorage.setItem('selectedTheme', theme);
  };
</script>

{#key theme}
  <button transition:fly={{ x: 100 }} on:click={changeTheme} class="text-3xl fixed right-2 bottom-3">{icon}</button>
{/key}
