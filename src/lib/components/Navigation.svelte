<script lang="ts" context="module">
  const navItemClasses = 'px-3 py-1 rounded hover:bg-primary transition-colors duration-200';
  const navItemClassesNotActive = 'hover:bg-opacity-30';
  const navItemClassesActive = 'bg-primary text-neutral-50';

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
  import { ArrowRightToBracketOutline, UserOutline } from 'flowbite-svelte-icons';
  import ThemeSwitcher from './ThemeSwitcher.svelte';

  let { theme, user } = $props<{ theme: string; user: { id: number; name: string } }>();

  const currentPath = $derived($page.url.pathname.replace('/', ''));
</script>

<nav class="bg-backgroundSecondary flex p-5 items-center">
  <span class="flex-1 tracking-widest font-mono">i18n-editor</span>
  <ul class="flex-1 flex justify-center gap-2">
    {#each navItemList as item}
      <li>
        <button
          class={classnames(navItemClasses, currentPath === item.key ? navItemClassesActive : navItemClassesNotActive)}
          on:click={() => goto(`/${item.key}`)}
        >
          {item.label}
        </button>
      </li>
    {/each}
  </ul>
  <span class="flex-1 flex justify-end items-center gap-4">
    <span class="py-0.5 px-2 rounded border border-borderColor bg-background flex items-center gap-1 text-textColor">
      <UserOutline />
      {user.name}
    </span>
    <ThemeSwitcher {theme} classNames="py-0.5 px-2 rounded border border-borderColor bg-background" />
    <form action="/login?/logout" method="post" class="">
      <button class="py-0.5 px-2 rounded bg-error flex items-center gap-1 text-neutral-50">
        <ArrowRightToBracketOutline size="sm" /> Logout
      </button>
    </form>
  </span>
</nav>
