import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { SignInLocalDto } from './dto/signIn.dto';
import { SignUpLocalDto } from './dto/signUpLocal.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(signInDto: SignInLocalDto): Promise<any> {
    let user: User;

    try {
      user = await this.userService.findOne({ email: signInDto.email });
    } catch (err) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${signInDto.email}`,
      );
    }

    if (
      !(await this.userService.isPasswordMatch(
        signInDto.password,
        user.password,
      ))
    ) {
      throw new UnauthorizedException(
        `Wrong password for user with email: ${signInDto.email}`,
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async login(user: User) {
    const sub = user._id.toString()
    const payload = { username: user.email, sub };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(signUpUserDto: SignUpLocalDto) {
    const user = await this.userService.create(signUpUserDto);
    return this.login(user);
  }

  // TODO: remove after testing
  async test(email: string){
    return this.userService.findOne({ email })
  }
}
