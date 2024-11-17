import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AddressType } from 'src/enum/adressType.enum';

export class CreateAddressDto {
  @ApiProperty({ description: 'Street name' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ description: 'Street number' })
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty({ description: 'Additional information (optional)' })
  @IsOptional()
  @IsString()
  additionalInfo?: string;

  @ApiProperty({ description: 'City' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ description: 'State' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ description: 'Country' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ description: 'Postal code' })
  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @ApiProperty({ description: 'Address Type', enum: AddressType })
  @IsNotEmpty()
  @IsEnum(AddressType)
  adress_type: AddressType;

  @ApiProperty({ description: 'Client ID' })
  @IsOptional()
  @IsInt()
  clientId?: number;
}