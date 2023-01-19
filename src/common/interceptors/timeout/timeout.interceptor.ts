import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from '@nestjs/common';
import { catchError, Observable, throwError, timeout, TimeoutError } from 'rxjs';

// nother technique useful for Interceptors is to extend the basic function behavior by applying RxJS operators to the response stream.

// ﻿To help us learn about this concept by example - let’s imagine that we need to handle timeouts for all of our route requests.

// When an endpoint does not return anything after a certain period of time, we need to terminate the request, and send back an error message.


@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(timeout(3000),catchError(err=>{
      if (err instanceof TimeoutError) {
        return throwError(new RequestTimeoutException());
        }
        return throwError(err);
    }));
  }
}
