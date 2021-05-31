import { IsString, IsNotEmpty, IsEmail, Length, IsMongoId, IsOptional } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'the users email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @IsNotEmpty()
  readonly role: string;

  @IsMongoId()
  @IsOptional()
  readonly customer: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
