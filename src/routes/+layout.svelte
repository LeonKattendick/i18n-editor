<script lang="ts">
  import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
  import '../app.css';

  let theme = $state('dark');
</script>

<div data-theme={theme} class="h-screen w-full bg-background text-foreground">
  <ThemeSwitcher bind:theme />
  <slot />
</div>
