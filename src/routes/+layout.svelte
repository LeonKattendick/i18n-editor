<script lang="ts">
  import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
  import '../app.css';

  let { data } = $props();
  let theme = $derived(data.theme);
</script>

<div data-theme={theme} class="h-screen w-full bg-background text-textColor">
  <ThemeSwitcher {theme} />
  <slot />
</div>
