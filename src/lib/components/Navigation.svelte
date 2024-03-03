<script lang="ts" context="module">
  const navItemClasses = 'px-3 py-1';
  const navItemClassesActive = 'bg-primary rounded text-neutral-50';

  const navItemList = [
    {
      key: 'projects',
      label: 'Meine Projekte',
    },
    {
      key: 'edit',
      label: 'Projekt bearbeiten',
    },
  ];
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import classnames from 'classnames';
  import { ArrowRightToBracketOutline } from 'flowbite-svelte-icons';

  const { user } = $props<{ user: { id: number; name: string } }>();

  const currentPath = $derived($page.url.pathname.replace('/', ''));
</script>

<nav class="bg-backgroundSecondary flex p-5 items-center">
  <span class="flex-1 tracking-widest font-mono">i18n-editor</span>
  <ul class="flex-1 flex justify-center gap-2">
    {#each navItemList as item}
      <li>
        <button
          class={classnames(navItemClasses, currentPath === item.key && navItemClassesActive)}
          on:click={() => goto(`/${item.key}`)}
        >
          {item.label}
        </button>
      </li>
    {/each}
  </ul>
  <span class="flex-1 flex justify-end items-center gap-4">
    <span class="">Hi, {user.name}!</span>
    <form action="/login?/logout" method="post" class="">
      <button class="py-0.5 px-2 rounded bg-error flex items-center gap-1 text-neutral-50">
        <ArrowRightToBracketOutline size="sm" /> Logout
      </button>
    </form>
  </span>
</nav>
