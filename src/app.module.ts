import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './common/filters/HttpExceptionFilter.filter';

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
    }
  ],
})
export class AppModule { }
