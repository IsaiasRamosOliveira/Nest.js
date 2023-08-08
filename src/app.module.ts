import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_FILTER } from "@nestjs/core"
import { HttpExceptionGlobal } from './filter/HttpExceptionGlobal';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    OrderModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionGlobal
    }
  ]
})
export class AppModule { }
