<script lang="ts">
  import '../app.css';

  let { data } = $props();
  const theme = $derived(data.theme);
</script>

<div data-theme={theme} class="h-screen w-full bg-background text-textColor">
  <slot />
</div>
