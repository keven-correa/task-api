import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'tasks_management_db',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mypostgresdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
