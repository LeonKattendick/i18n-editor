<script lang="ts">
  import Loading from '../Loading.svelte';
  import type { TranslationWithItems } from './Editor.svelte';

  let { translation } = $props<{ translation?: TranslationWithItems }>();
</script>

{#if translation}
  <div class="w-full p-3">test</div>
{:else}
  <Loading>Wähle einen Übersetzungschlüssel aus</Loading>
{/if}
