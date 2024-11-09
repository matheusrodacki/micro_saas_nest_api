// create-client.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ClientType } from 'src/enum/clientType.enum';
import { Status } from 'src/enum/status.enum';

export class ClienteDto {
  @ApiProperty({ description: 'Client ID', example: 1 })
  client_id: number;

  @ApiProperty({
    description: 'Client type',
    enum: ClientType,
  })
  @IsEnum(ClientType)
  clientType: ClientType;

  @ApiProperty({
    description: 'Client status',
    enum: Status,
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    description: 'Client notes',
    example: 'Some notes about the client',
  })
  @IsString()
  @IsNotEmpty()
  notes: string;

  @ApiProperty({
    description: 'Creation date',
    example: '2023-10-01T12:00:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2023-10-02T15:30:00Z',
  })
  updated_at: Date;
}
