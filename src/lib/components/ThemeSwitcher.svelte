<script lang="ts" context="module">
  export const supportedThemes = ['light', 'dark'];
</script>

<script lang="ts">
  let { theme, classNames } = $props<{ theme: string; classNames: string }>();

  const icon = $derived.by(() => {
    if (theme === 'light') return '🌞';
    if (theme === 'dark') return '🌙';
  });
</script>

<form action="/?/theme" method="post">
  <button class={classNames}>{icon}</button>
</form>
