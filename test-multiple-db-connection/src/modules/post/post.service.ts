import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from 'src/models';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post, 'postgres_2')
    private postModel: typeof Post,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.findAll();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findOne({
      where: { id },
    });
  }

  async create(post: Partial<Post>): Promise<Post> {
    return this.postModel.create(post);
  }
}
