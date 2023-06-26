import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './common/filters/HttpExceptionFilter.filter';
import { TransformResponseInterceptor } from './core/http/TransformResponse.interceptor';

@Module({
  imports: [UserModule],
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
