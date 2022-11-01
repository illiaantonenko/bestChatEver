import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserService } from 'src/user/user.service';
import { SignInDto as SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async singUp(createUserDto: CreateUserDto): Promise<any> {
    const userExists = await this.userService.findOne({
      email: createUserDto.email,
    });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    //Hash password
    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.userService.create({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(newUser._id, newUser.email);
    await this.updateRefreshToken(newUser._id, tokens.refreshToken);
    return tokens;
  }

  async signIn(signInDto: SignInDto) {
    //Check if user exist
    const user = await this.userService.findOne({ email: signInDto.email });
    if (!user)
      throw new BadRequestException(
        `There isn't any user with email: ${signInDto.email}`,
      );

    //Check password match
    const passwordMatches = await argon2.verify(
      user.password,
      signInDto.password,
    );
    if (!passwordMatches)
      throw new UnauthorizedException('Password is incorrect!');
    const tokens = await this.getTokens(user._id, signInDto.email);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    return this.userService.update(userId, { refreshToken: null });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          ),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
          ),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new ForbiddenException('Access Denied!');
    const refreshTokenMatch = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatch) throw new ForbiddenException('Access Denied!');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
