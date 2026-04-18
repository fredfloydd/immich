<script lang="ts">
  import { mdiAccountCircleOutline } from '@mdi/js';
  import { t } from 'svelte-i18n';

  import type { AssetResponseDto } from '@immich/sdk';
  import { modalManager } from '@immich/ui';

  import MenuOption from '$lib/components/shared-components/context-menu/menu-option.svelte';
  import ProfileImageCropperModal from '$lib/modals/ProfileImageCropperModal.svelte';

  interface Props {
    asset: AssetResponseDto;
  }

  let { asset }: Props = $props();
</script>

<MenuOption
  icon={mdiAccountCircleOutline}
  onClick={() => modalManager.show(ProfileImageCropperModal, { asset })}
  text={$t('set_as_profile_picture')}
/>
