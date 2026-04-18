<script lang="ts">
  import { mdiTextRecognition } from '@mdi/js';
  import { t } from 'svelte-i18n';

  import { IconButton } from '@immich/ui';

  import { ocrManager } from '$lib/stores/ocr.svelte';
</script>

<IconButton
  title={ocrManager.showOverlay ? $t('hide_text_recognition') : $t('show_text_recognition')}
  icon={mdiTextRecognition}
  class={"dark {ocrStore.showOverlay ? 'bg-immich-primary text-white dark' : 'dark'}"}
  color="secondary"
  variant="ghost"
  shape="round"
  aria-label={$t('text_recognition')}
  onclick={() => ocrManager.toggleOcrBoundingBox()}
/>
