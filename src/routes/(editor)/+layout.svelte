<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';

  const { data } = $props();
</script>

<Navigation user={data.user} />
<div class="p-4">
  <slot />
</div>
