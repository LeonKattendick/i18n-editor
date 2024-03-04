<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';

  let { data } = $props();
</script>

<div class="h-full flex flex-col">
  <Navigation theme={data.theme} user={data.user} />
  <div class="h-full p-5">
    <slot />
  </div>
</div>
