<script lang="ts">
  import { Link } from '@immich/ui';

  import FormatMessage from '$lib/elements/FormatMessage.svelte';

  type Props = {
    href: string;
  };

  const { href }: Props = $props();
</script>

<FormatMessage key="link_to_docs">
  {#snippet children({ message })}
    <Link {href}>{message}</Link>
  {/snippet}
</FormatMessage>
