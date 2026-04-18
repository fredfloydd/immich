<script lang="ts">
  import { t } from 'svelte-i18n';

  import type { AlbumResponseDto } from '@immich/sdk';

  interface Props {
    album: AlbumResponseDto;
  }

  let { album }: Props = $props();
</script>

<span>{$t('items_count', { values: { count: album.assetCount } })}</span>
{#if album.shared}
  <span>• {$t('shared')}</span>
{/if}
