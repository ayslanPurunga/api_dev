import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender } from '../../enum/gender.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeveloperDto {
  @ApiProperty({ description: 'Nome do desenvolvedor' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @MinLength(3, { message: 'Tem que conter no minimo 3 caracteres.' })
  @IsString()
  name: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ description: 'Hobby do desenvolvedor' })
  @IsString()
  hobby: string;

  @ApiProperty({ description: 'Data de nascimento do desenvolvedor' })
  @IsDateString()
  birthDate: string;
}
