<script lang="ts">
  import { mdiCheck, mdiClose } from '@mdi/js';

  import { Icon, Text } from '@immich/ui';

  interface Props {
    title: string;
    state: boolean;
  }

  let { title, state }: Props = $props();
</script>

<div class="flex justify-between items-center">
  <Text class="text-sm" fontWeight="medium">{title}</Text>
  <Icon icon={state ? mdiCheck : mdiClose} class={state ? 'text-primary' : 'text-danger'} size="24" />
</div>
