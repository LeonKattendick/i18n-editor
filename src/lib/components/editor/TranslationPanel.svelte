<script lang="ts">
  import Loading from '../Loading.svelte';
  import type { TranslationWithItems } from './Editor.svelte';

  let { translation } = $props<{ translation?: TranslationWithItems }>();
</script>

{#if translation}
  test
{:else}
  <Loading>Wähle einen Übersetzungschlüssel aus</Loading>
{/if}
