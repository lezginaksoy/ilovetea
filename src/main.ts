import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions:{
        enableImplicitConversion:true,
      }
    }),
  );
  
  
  app.useGlobalInterceptors(new WrapResponseInterceptor(),new TimeoutInterceptor());
  //app.useGlobalGuards(new ApiKeyGuard());
  //app.useGlobalFilters(new HttpExceptionFilter());//for global

const options=new DocumentBuilder().setTitle('IluvTea').setDescription('Tea application :)').setVersion('1.0').build();
const document=SwaggerModule.createDocument(app,options);
SwaggerModule.setup('Api',app,document);

  await app.listen(3000);
}
bootstrap();
