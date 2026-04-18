<script lang="ts">
  import { Button } from '@immich/ui';

  import type { HeaderButtonActionItem } from '$lib/types';

  type Props = {
    action: HeaderButtonActionItem;
  };

  const { action }: Props = $props();
  const { title, icon, color = 'secondary', onAction } = $derived(action);
</script>

{#if action.$if?.() ?? true}
  <Button
    variant="ghost"
    size="small"
    {color}
    leadingIcon={icon}
    onclick={() => onAction(action)}
    title={action.data?.title}
  >
    {title}
  </Button>
{/if}
