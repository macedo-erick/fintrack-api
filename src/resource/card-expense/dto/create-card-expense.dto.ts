import { ApiProperty } from '@nestjs/swagger';

export class CreateCardExpenseDto {
  description: string;

  value: number;

  date: Date;

  category: string;

  tags?: string[];

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Attachments to upload',
  })
  attachments?: any;

  installments: number;

  invoice: string;
}
