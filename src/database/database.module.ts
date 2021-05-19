import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, password, host, name } = configService.database;
        return {
          uri: `mongodb+srv://${host}`,
          user,
          pass: password,
          dbName: name,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { user, password, host, name } = configService.database;
        const uri = `mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(name);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MONGO', MongooseModule],
})
export class DatabaseModule {}
