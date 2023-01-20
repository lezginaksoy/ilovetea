import { Injectable, NestMiddleware } from '@nestjs/common';
// Middleware functions have access to the request and response objects, and are not specifically tied to any method, but rather to a specified route PATH.

// Middleware functions can perform the following tasks:

// executing code
// making changes to the request and the response objects.
// ending the request-response cycle.
// Or even calling the next middleware function in the call stack.
// When working with middleware, if the current middleware function does not END the request-response cycle, it must call the next() method, which passes control to the next middleware function.

// Otherwise, the request will be left hanging - and never complete.

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Request-response time');
    console.log('Hi from middleware');
    
    res.on('finish', () => console.timeEnd('Request-response time'));
    next();
  }
}
