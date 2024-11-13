import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User, 'postgres_1')
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async create(data: Partial<User>): Promise<User> {
    return this.userModel.create(data);
  }

  async update(id: number, data: Partial<User>): Promise<[number, User[]]> {
    return this.userModel.update(data, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    return this.userModel.destroy({
      where: { id },
    });
  }
}
