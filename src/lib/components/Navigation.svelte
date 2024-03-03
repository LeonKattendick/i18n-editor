<script lang="ts">
  import { ArrowRightToBracketOutline } from 'flowbite-svelte-icons';

  const { user } = $props<{ user: { id: number; name: string } }>();
</script>

<nav class="bg-backgroundSecondary flex justify-between p-5">
  <span>{user.name}</span>
  <span>{user.name}</span>
  <span>
    <form action="/login?/logout" method="post">
      <button class="py-0.5 px-2 rounded bg-error flex items-center gap-1">
        <ArrowRightToBracketOutline size="sm" /> Logout
      </button>
    </form>
  </span>
</nav>
