import { IsDefined, IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @MinLength(8)
  password: string;
}
