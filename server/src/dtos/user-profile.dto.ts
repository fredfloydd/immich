import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

import { isoDatetimeToDate } from 'src/validation';

export class CreateProfileImageDto {
  @ApiProperty({ type: 'string', format: 'binary', description: 'Profile image file' })
  file!: Express.Multer.File;
}

const CreateProfileImageResponseSchema = z
  .object({
    userId: z.string().describe('User ID'),
    profileChangedAt: isoDatetimeToDate.describe('Profile image change date'),
    profileImagePath: z.string().describe('Profile image file path'),
  })
  .meta({ id: 'CreateProfileImageResponseDto' });

export class CreateProfileImageResponseDto extends createZodDto(CreateProfileImageResponseSchema) {}
