import type { Mock, MockedObject } from 'vitest';

import * as sdk from '@immich/sdk';

vi.mock('@immich/sdk', async (originalImport) => {
  const module = await originalImport<typeof import('@immich/sdk')>();

  const mocks: Record<string, Mock> = {};
  for (const [key, value] of Object.entries(module)) {
    if (typeof value === 'function') {
      mocks[key] = vi.fn();
    }
  }

  const mock = { ...module, ...mocks };
  return { ...mock, default: mock };
});

export const sdkMock = sdk as MockedObject<typeof sdk>;
