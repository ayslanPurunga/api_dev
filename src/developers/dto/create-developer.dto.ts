import { IsDate, IsEnum, IsString } from 'class-validator';
import { Gender } from '../../enum/gender.enum';

export class CreateDeveloperDto {
  @IsString()
  name: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  hobby: string;

  @IsDate()
  birthAt: Date;
}
