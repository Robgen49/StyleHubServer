import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Group } from 'src/group/group.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.Private_Key || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    }),
    SequelizeModule.forFeature([Group]),
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule { }
