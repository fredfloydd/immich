import { Selectable } from 'kysely';
import { SessionLike } from 'test/factories/types';
import { newDate, newUuid, newUuidV7 } from 'test/small.factory';

import { SessionTable } from 'src/schema/tables/session.table';

export class SessionFactory {
  private constructor(private value: Selectable<SessionTable>) {}

  static create(dto: SessionLike = {}) {
    return SessionFactory.from(dto).build();
  }

  static from(dto: SessionLike = {}) {
    return new SessionFactory({
      appVersion: null,
      createdAt: newDate(),
      deviceOS: 'android',
      deviceType: 'mobile',
      expiresAt: null,
      id: newUuid(),
      isPendingSyncReset: false,
      parentId: null,
      pinExpiresAt: null,
      token: Buffer.from('abc123'),
      updateId: newUuidV7(),
      updatedAt: newDate(),
      userId: newUuid(),
      oauthSid: newUuid(),
      ...dto,
    });
  }

  build() {
    return { ...this.value };
  }
}
