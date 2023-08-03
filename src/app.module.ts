import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './common/filters/HttpExceptionFilter.filter';
import { TransformResponseInterceptor } from './core/http/TransformResponse.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigService } from './config/postgres.config.service';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    })
  ],
  controllers: [],
  providers: [
    { 
      provide: APP_FILTER, 
      useClass: HttpExceptionFilter 
    }, {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor
    }
  ],
})
export class AppModule { }
