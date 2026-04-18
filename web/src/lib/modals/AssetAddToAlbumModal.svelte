<script lang="ts">
  import { type AlbumResponseDto } from '@immich/sdk';

  import AlbumPickerModal from '$lib/modals/AlbumPickerModal.svelte';
  import { addAssetsToAlbums } from '$lib/services/album.service';

  type Props = {
    assetIds: string[];
    onClose: () => void;
  };

  const { assetIds, onClose }: Props = $props();

  const handleClose = async (albums?: AlbumResponseDto[]) => {
    const albumIds = (albums ?? []).map(({ id }) => id);
    if (albumIds.length === 0) {
      onClose();
      return;
    }

    const success = await addAssetsToAlbums(albumIds, assetIds, { notify: true });
    if (success) {
      onClose();
    }
  };
</script>

<AlbumPickerModal onClose={handleClose} />
