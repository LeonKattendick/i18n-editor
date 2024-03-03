<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';

  let { data } = $props();
</script>

<Navigation theme={data.theme} user={data.user} />
<div class="p-4">
  <slot />
</div>
