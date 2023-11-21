import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigOptions, TypeOrmOptions } from '../config';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ConfigModule.forRoot(ConfigOptions),
    TypeOrmModule.forRootAsync(TypeOrmOptions),
    RouterModule.register([
      { path: 'auth', module: AuthModule },
      { path: 'products', module: ProductsModule },
      { path: 'categories', module: CategoriesModule },
      { path: 'users', module: UsersModule },
    ]),
    AuthModule,
    ProductsModule,
    AwsModule,
    UsersModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
