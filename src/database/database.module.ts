import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';

import config from '../config';

@Global()
@Module({
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
  exports: ['MONGO'],
})
export class DatabaseModule {}
