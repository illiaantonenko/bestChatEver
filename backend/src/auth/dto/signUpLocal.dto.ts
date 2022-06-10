import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpLocalDto {
  @IsDefined()
  @IsString()
  firstName: string;

  @IsDefined()
  @IsString()
  lastName: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @MinLength(8)
  password: string;
}
