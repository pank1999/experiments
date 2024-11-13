import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from 'src/models';

@Module({
  imports: [SequelizeModule.forFeature([Post], 'postgres_2')],
  providers: [PostService],
  controllers: [PostController],
  exports: [SequelizeModule],
})
export class PostModule {}
