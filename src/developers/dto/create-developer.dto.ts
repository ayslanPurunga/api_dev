import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUppercase,
  MinLength,
} from 'class-validator';
import { Gender } from '../../enum/gender.enum';

export class CreateDeveloperDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @MinLength(3, { message: 'Tem que conter no minimo 3 caracteres.' })
  @IsString()
  name: string;

  @IsUppercase()
  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  hobby: string;

  @IsDateString()
  birthDate: string;
}
