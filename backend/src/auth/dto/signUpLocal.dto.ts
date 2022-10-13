import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpLocalDto {
  @IsDefined()
  @IsString()
  firstName: string;

  @IsDefined()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
