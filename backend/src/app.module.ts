import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    ChatModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://admin:MS0l3mPbdtjlpFwa@cluster0.od4pt.mongodb.net/best-chat?retryWrites=true&w=majority',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
