<script lang="ts">
  import { onMount } from 'svelte';
  import { webkitLineClamp } from 'webkit-line-clamp';

  export let lines = 2;

  let textBlock: HTMLElement;

  onMount(async () => {
    const slot = textBlock.firstElementChild as HTMLElement;
    !!process.env.IS_LEGACY ? webkitLineClamp(slot, lines) : slot.classList.add(`line-clamp-${lines}`);
  });
</script>

<div bind:this={textBlock}><slot /></div>
