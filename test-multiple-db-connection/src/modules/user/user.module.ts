import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models';

@Module({
  imports: [SequelizeModule.forFeature([User], 'postgres_1')],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
