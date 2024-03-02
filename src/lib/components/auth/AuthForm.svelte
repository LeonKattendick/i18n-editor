<script lang="ts" context="module">
  type Props = { type: 'login' | 'register' };
</script>

<script lang="ts">
  import { goto } from '$app/navigation';

  const { type } = $props<Props>();
  const isLogin = type === 'login';
</script>

<form
  action={`?/${type}`}
  method="post"
  class="flex flex-col gap-6 border border-borderColor px-4 py-5 rounded min-w-[20%]"
>
  <input
    class="py-1 bg-transparent border-b border-b-borderColor outline-none"
    type="text"
    placeholder="Nutzername"
    name="name"
  />
  <input
    class="py-1 bg-transparent border-b border-b-borderColor outline-none"
    type="password"
    placeholder="Passwort"
    name="password"
  />
  {#if !isLogin}
    <input
      class="py-1 bg-transparent border-b border-b-borderColor outline-none"
      type="password"
      placeholder="Passwort bestätigen"
      name="password_confirm"
    />
  {/if}
  <div class="flex flex-col gap-2">
    <button class="bg-primary text-zinc-50 rounded py-1 font-semibold tracking-wide" type="submit">
      {isLogin ? 'Einloggen' : 'Neuen Account erstellen'}
    </button>
    <button class="text-secondary self-end" onclick={() => goto(isLogin ? '/register' : '/login')} type="button">
      {isLogin ? 'Account erstellen' : 'Einloggen'}
    </button>
  </div>
</form>
