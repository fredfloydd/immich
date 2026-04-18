import { writable } from 'svelte/store';

import { type MaintenanceAuthDto, type MaintenanceStatusResponseDto } from '@immich/sdk';

export const maintenanceStore = {
  auth: writable<MaintenanceAuthDto>(),
  status: writable<MaintenanceStatusResponseDto | undefined>(),
};
