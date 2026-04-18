<script lang="ts" generics="T extends Record<string, unknown>">
  import type { Component } from 'svelte';

  import { TooltipProvider } from '@immich/ui';

  type Props = {
    component: Component<T>;
    componentProps: T;
  };

  const { component: Test, componentProps }: Props = $props();
</script>

<TooltipProvider>
  <Test {...componentProps} />
</TooltipProvider>
