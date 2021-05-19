import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { MongoClient } from 'mongodb';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import config from './config';
import { envs } from './enviroments';

const uri =
  'mongodb+srv://store_admin:YLZyrNZN73kM4gg8@cluster0-gq1wj.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
async function run() {
  await client.connect();
  const database = client.db('platzi_store');
  const tasksCollection = database.collection('tasks');
  const tasks = await tasksCollection.find().toArray();
  console.log(tasks);
}
run();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envs[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATA_BASE_NAME: Joi.string().required(),
        DATA_BASE_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    ProductsModule,
    UsersModule,
    DatabaseModule,
  ],
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
