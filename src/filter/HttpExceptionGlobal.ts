import { HttpStatus, ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class HttpExceptionGlobal implements ExceptionFilter {
    constructor(
        private adapterHost: HttpAdapterHost
    ) { }
    catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.adapterHost
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const { status, body } =
            exception instanceof HttpException ?
                {
                    status: exception.getStatus(),
                    body: exception.getResponse()
                }
                :
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    body: {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        timesTamp: new Date().toISOString(),
                        path: httpAdapter.getRequestUrl(request),
                    }
                }
        httpAdapter.reply(response, body, status);
    }
}