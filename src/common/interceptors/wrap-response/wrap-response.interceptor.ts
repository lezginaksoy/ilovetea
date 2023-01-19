import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

// bind extra logic before or after method execution
// transform the result returned from a method
// transform the exception thrown from a method
// extend basic method behavior
// or even completely overriding a method - depending on a specific condition (for example: doing something like caching various responses)
@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...')
    
    return next.handle().pipe(map((data)=>({data})));
    //return next.handle().pipe(tap(data=>console.log('after ...',data)));
  }
}
