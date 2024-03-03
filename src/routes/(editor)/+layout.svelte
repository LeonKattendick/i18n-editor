<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';

  const { data } = $props();
</script>

<Navigation user={data.user} />
<slot />
