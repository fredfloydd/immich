<script lang="ts">
  import { LoadingSpinner } from '@immich/ui';

  import { authManager } from '$lib/managers/auth-manager.svelte';

  void authManager.logout();
</script>

<div class="h-screen w-screen overflow-hidden">
  <div class="m-auto">
    <LoadingSpinner />
  </div>
</div>
