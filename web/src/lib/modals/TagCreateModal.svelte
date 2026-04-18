<script lang="ts">
  import { mdiTag } from '@mdi/js';
  import { t } from 'svelte-i18n';

  import { Field, FormModal, Input, Text } from '@immich/ui';

  import { handleCreateTag } from '$lib/services/tag.service';
  import type { TreeNode } from '$lib/utils/tree-utils';

  type Props = {
    onClose: () => void;
    baseTag?: TreeNode;
  };

  const { onClose, baseTag }: Props = $props();

  let tagValue = $state(baseTag?.path ? `${baseTag.path}/` : '');

  const onSubmit = async () => {
    const success = await handleCreateTag(tagValue);
    if (success) {
      onClose();
    }
  };
</script>

<FormModal size="small" title={$t('create_tag')} submitText={$t('create')} icon={mdiTag} {onClose} {onSubmit}>
  <Text size="small">{$t('create_tag_description')}</Text>
  <Field label={$t('tag')} required>
    <Input autofocus bind:value={tagValue} />
  </Field>
</FormModal>
