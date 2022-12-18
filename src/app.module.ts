import { join } from 'path';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo';
import type { OnApplicationBootstrap } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ProjectModule } from './project/project.module';
import { SeedService } from './seed/seed.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      subscriptions: { 'graphql-ws': true },
      driver: ApolloDriver,
      sortSchema: true,
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'develop',
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
      subscribers: [],
      migrations: ['dist/migrations/**.js'],
      migrationsRun: false,
    }),
    UserModule,
    ProjectModule,
    AuthModule,
  ],
  providers: [SeedService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
// TODO: seedingの実現を考える
export class AppModule implements OnApplicationBootstrap {
  private readonly _seedService: SeedService;

  constructor(seedService: SeedService) {
    this._seedService = seedService;
  }

  async onApplicationBootstrap() {
    await this._seedService.seed();
  }
}
