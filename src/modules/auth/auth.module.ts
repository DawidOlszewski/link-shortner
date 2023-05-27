import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MagicLoginStrategy } from './magic-login.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersModule } from '@users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import getenv from 'getenv';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'password',
      signOptions: { expiresIn: '1h' },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp-mail.outlook.com',
        secureConnection: true,
        port: 587,
        tls: {
          ciphers: 'SSLv3',
        },
        auth: {
          user: getenv('EMAIL_USER'),
          pass: getenv('EMAIL_PASS'),
        },
      },
      defaults: {
        from: getenv('EMAIL_USER'),
      },
    }),
  ],
  providers: [AuthService, MagicLoginStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}