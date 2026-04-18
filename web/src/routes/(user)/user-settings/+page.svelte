<script lang="ts">
  import { t } from 'svelte-i18n';

  import { Container } from '@immich/ui';

  import UserPageLayout from '$lib/components/layouts/user-page-layout.svelte';
  import { getKeyboardActions } from '$lib/services/keyboard.service';

  import type { PageData } from './$types';
  import UserSettingsList from './user-settings-list.svelte';

  type Props = {
    data: PageData;
  };

  let { data }: Props = $props();

  const { KeyboardShortcuts } = $derived(getKeyboardActions($t));
</script>

<UserPageLayout title={data.meta.title} actions={[KeyboardShortcuts]}>
  <Container size="medium" center>
    <UserSettingsList keys={data.keys} sessions={data.sessions} />
  </Container>
</UserPageLayout>
