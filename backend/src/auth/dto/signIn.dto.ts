import { IsDefined, IsEmail, MinLength } from 'class-validator';

export class SignInLocalDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @MinLength(8)
  password: string;
}
