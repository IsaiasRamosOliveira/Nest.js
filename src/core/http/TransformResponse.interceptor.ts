import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestResponse } from './nestResponse';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
    private httpAdapter: AbstractHttpAdapter
    constructor(
        adapterHost: HttpAdapterHost
    ) {
        this.httpAdapter = adapterHost.httpAdapter
    }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle()
            .pipe(
                map((controllerResponse: NestResponse) => {
                    if (controllerResponse instanceof NestResponse) {
                        const ctxt = context.switchToHttp();
                        const response = ctxt.getResponse();
                        const {
                            headers,
                            status,
                            body
                        } = controllerResponse;

                        const namesHeaders = Object.getOwnPropertyNames(headers);
                        namesHeaders.forEach(names => {
                            const responseHeader = headers[names];
                            this.httpAdapter.setHeader(response, names, responseHeader)
                        });
                        this.httpAdapter.status(response, status);
                        return body;
                    }
                    return controllerResponse;
                })
            )
    }
}