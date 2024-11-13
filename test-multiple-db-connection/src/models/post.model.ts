import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'posts' })
export class Post extends Model {
  @Column
  title: string;

  @Column
  content: string;
}
