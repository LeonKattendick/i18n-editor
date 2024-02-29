<script lang="ts">
  import '../app.css';
  import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

  let theme = $state('light');
</script>

<div data-theme={theme} class="h-screen w-full bg-background text-foreground">
  <ThemeSwitcher bind:theme />
  <slot />
</div>
