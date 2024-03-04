<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
  import classnames from 'classnames';

  let { form, data } = $props();
  const theme = $derived(data.theme);

  const errorMessage = $derived.by(() => {
    if (form?.required) return 'Füllen Sie alle Felder aus';
    if (form?.wrongFormatName) return 'Der Nutzername hat ein falsches Format';
    if (form?.wrongFormatPassword) return 'Das Passwort ist zu kurz';
    if (form?.passwordMismatch) return 'Die beiden Passwörter stimmen nicht überein';
    if (form?.notUniqueUser) return 'Der Nutzername exisitert bereits';
    return '';
  });
</script>

<svelte:head>
  <title>i18n-editor :: Registrierung</title>
</svelte:head>

<ThemeSwitcher {theme} classNames="text-3xl fixed right-2 bottom-3" />
<form
  action={`?/register`}
  method="post"
  class="flex flex-col gap-6 border border-borderColor px-4 py-5 rounded min-w-[20%] bg-backgroundSecondary"
  use:enhance
>
  <input
    class={classnames(
      'py-1 bg-transparent border-b border-b-borderColor outline-none',
      (form?.required || form?.notUniqueUser) && 'border-b-error placeholder:text-error',
    )}
    type="text"
    placeholder="Nutzername (mind. 3 Zeichen [A-Z/0-9])"
    name="name"
    minlength="3"
  />
  <input
    class={classnames(
      'py-1 bg-transparent border-b border-b-borderColor outline-none',
      (form?.required || form?.passwordMismatch) && 'border-b-error placeholder:text-error',
    )}
    type="password"
    placeholder="Passwort (mind. 6 Zeichen)"
    name="password"
    minlength="6"
  />
  <input
    class={classnames(
      'py-1 bg-transparent border-b border-b-borderColor outline-none',
      (form?.required || form?.passwordMismatch) && 'border-b-error placeholder:text-error',
    )}
    type="password"
    placeholder="Passwort wiederholen"
    name="password_confirm"
  />
  {#if errorMessage}
    <span class="text-error text-sm font-bold">{errorMessage}</span>
  {/if}
  <div class="flex flex-col gap-1">
    <button class="bg-success text-neutral-50 rounded py-1 font-semibold tracking-wide outline-none" type="submit">
      Neuen Account erstellen
    </button>
    <button class="text-secondary self-end outline-none" onclick={() => goto('/login')} type="button">Einloggen</button>
  </div>
</form>
