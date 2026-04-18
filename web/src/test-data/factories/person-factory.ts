import { faker } from '@faker-js/faker';
import { Sync } from 'factory.ts';

import type { PersonResponseDto } from '@immich/sdk';

export const personFactory = Sync.makeFactory<PersonResponseDto>({
  birthDate: Sync.each(() => faker.date.past().toISOString()),
  id: Sync.each(() => faker.string.uuid()),
  isHidden: Sync.each(() => faker.datatype.boolean()),
  name: Sync.each(() => faker.person.fullName()),
  thumbnailPath: Sync.each(() => faker.system.filePath()),
  updatedAt: Sync.each(() => faker.date.recent().toISOString()),
});
