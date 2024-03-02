<script lang="ts">
  import { goto } from '$app/navigation';
  import classnames from 'classnames';

  const { form } = $props();

  const errorMessage = $derived.by(() => {
    if (form?.required) return 'Füllen Sie alle Felder aus';
    if (form?.wrongFormat) return 'Der Nutzername hat ein falsches Format';
    if (form?.passwordMismatch) return 'Nutzername & Passwort stimmen nicht überein';
    return '';
  });
</script>

<svelte:head>
  <title>i18n-editor :: Login</title>
</svelte:head>

<form
  action={`?/login`}
  method="post"
  class="flex flex-col gap-6 border border-borderColor px-4 py-5 rounded min-w-[20%]"
>
  <input
    class={classnames(
      'py-1 bg-transparent border-b border-b-borderColor outline-none',
      (form?.required || form?.wrongFormat) && 'border-b-error placeholder:text-error',
    )}
    type="text"
    placeholder="Nutzername"
    name="name"
  />
  <input
    class={classnames(
      'py-1 bg-transparent border-b border-b-borderColor outline-none',
      (form?.required || form?.passwordMismatch) && 'border-b-error placeholder:text-error',
    )}
    type="password"
    placeholder="Passwort"
    name="password"
  />
  {#if errorMessage}
    <span class="text-error text-sm font-bold">{errorMessage}</span>
  {/if}
  <div class="flex flex-col gap-2">
    <button class="bg-primary text-zinc-50 rounded py-1 font-semibold tracking-wide" type="submit"> Einloggen </button>
    <button class="text-secondary self-end" onclick={() => goto('/register')} type="button"> Einloggen </button>
  </div>
</form>
