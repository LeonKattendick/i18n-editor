<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children } = $props<{ children: Snippet }>();
</script>

<div class="h-full w-full flex justify-center items-center font-mono tracking-widest">{@render children()}</div>
