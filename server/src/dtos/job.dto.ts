import { createZodDto } from 'nestjs-zod';
import z from 'zod';

import { ManualJobNameSchema } from 'src/enum';

const JobCreateSchema = z
  .object({
    name: ManualJobNameSchema,
  })
  .meta({ id: 'JobCreateDto' });

export class JobCreateDto extends createZodDto(JobCreateSchema) {}
