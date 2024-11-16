import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SeedService } from './seed.service';
import { ClientsModule } from './clients/client.module';
import { AddressesModule } from './addresses/addresses.module';
import { AuthorizationModule } from './roles/authorization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize:
          configService.get<string>('NODE_ENV') === 'development'
            ? configService.get<boolean>('DB_SYNCHRONIZE')
            : false,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    AuthorizationModule,
    UsersModule,
    ClientsModule,
    AddressesModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
