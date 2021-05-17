import { Module, HttpModule, HttpService } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [HttpModule, ProductsModule, UsersModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = http
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise();
        return tasks;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
