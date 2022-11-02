import { IsDefined, IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
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

  refreshToken: string;
}
