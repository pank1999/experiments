# Testing Multiple Database Connections in Nest.js using Sequelize

This guide demonstrates how to set up and test multiple database connections in a Nest.js application using Sequelize.

## Prerequisites

- Node.js and npm installed
- Nest.js CLI installed
- Sequelize and Sequelize CLI installed
- Databases set up (e.g., PostgreSQL, MySQL)

## Installation

1. Create a new Nest.js project:

```bash
nest new test-multiple-db-connection
```

2. Navigate to the project directory:

```bash
cd test-multiple-db-connection
```

3. Install Sequelize and necessary dependencies:

```bash
npm install --save @nestjs/sequelize sequelize sequelize-typescript pg pg-hstore mysql2
```

## Configuration

1. Configure the database connections in `app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      name: 'postgresConnection',
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'test_db',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forRoot({
      name: 'mysqlConnection',
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'test_db',
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
```

2. Define models for each database connection:

```typescript
import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class PostgresModel extends Model<PostgresModel> {
  @Column
  name: string;
}

@Table
export class MysqlModel extends Model<MysqlModel> {
  @Column
  name: string;
}
```

3. Register models in the respective modules:

```typescript
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostgresModel } from './postgres.model';
import { MysqlModel } from './mysql.model';

@Module({
  imports: [
    SequelizeModule.forFeature([PostgresModel], 'postgresConnection'),
    SequelizeModule.forFeature([MysqlModel], 'mysqlConnection'),
  ],
})
export class DatabaseModule {}
```

## Testing

1. Create a service to interact with the databases:

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostgresModel } from './postgres.model';
import { MysqlModel } from './mysql.model';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel(PostgresModel, 'postgresConnection')
    private readonly postgresModel: typeof PostgresModel,
    @InjectModel(MysqlModel, 'mysqlConnection')
    private readonly mysqlModel: typeof MysqlModel,
  ) {}

  async createPostgresRecord(name: string) {
    return this.postgresModel.create({ name });
  }

  async createMysqlRecord(name: string) {
    return this.mysqlModel.create({ name });
  }
}
```

2. Inject the service into a controller to test the connections:

```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post('postgres')
  async createPostgresRecord(@Body('name') name: string) {
    return this.databaseService.createPostgresRecord(name);
  }

  @Post('mysql')
  async createMysqlRecord(@Body('name') name: string) {
    return this.databaseService.createMysqlRecord(name);
  }
}
```

## Running the Application

1. Start the Nest.js application:

```bash
npm run start
```

2. Test the endpoints using a tool like Postman or curl:

```bash
curl -X POST http://localhost:3000/database/postgres -d "name=PostgresTest"
curl -X POST http://localhost:3000/database/mysql -d "name=MysqlTest"
```

## Conclusion

You have successfully set up and tested multiple database connections in a Nest.js application using Sequelize.
