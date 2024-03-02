<script lang="ts" context="module">
  type Props = { actionPath: 'login' | 'register'; buttonTitle: string; secondTitle: string };
</script>

<script lang="ts">
  import { goto } from '$app/navigation';

  const { actionPath, buttonTitle, secondTitle } = $props<Props>();
</script>

<form
  action={`?/${actionPath}`}
  method="post"
  class="flex flex-col gap-6 border border-borderColor px-4 py-5 rounded min-w-[20%]"
>
  <input class="py-1 bg-transparent border-b border-b-borderColor outline-none" type="text" placeholder="Nutzername" />
  <input
    class="py-1 bg-transparent border-b border-b-borderColor outline-none"
    type="password"
    placeholder="Passwort"
  />
  <div class="flex flex-col gap-2">
    <button class="bg-primary text-zinc-50 rounded py-1 font-semibold tracking-wide" type="submit">
      {buttonTitle}
    </button>
    <button
      class="text-secondary self-end"
      onclick={() => goto(actionPath === 'login' ? '/register' : '/login')}
      type="button"
    >
      {secondTitle}
    </button>
  </div>
</form>
