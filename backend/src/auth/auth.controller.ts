import {
  Body,
  Controller, Get,
  Post, Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.schema';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { AuthService } from './auth.service';
import { SignUpLocalDto } from './dto/signUpLocal.dto';

@Controller('auth')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user._doc); // what needs to be done
  }

  @Post('register')
  register(@Body() signUpLocalDto: SignUpLocalDto) {
    return this.authService.register(signUpLocalDto);
  }

  @Get('test')
  test(@Query('email') email: string) {
    return this.authService.test(email);
  }
}
