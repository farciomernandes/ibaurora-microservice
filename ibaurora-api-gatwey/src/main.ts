import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filter/http-exception.filter';
import { TimeoutInterceptor } from './shared/interceptors/timeout.interceptor';

const PREFIX = 'api/v1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.setGlobalPrefix(PREFIX);
  setDocumentation(app);
  app.enableCors();
  app.use(
    rateLimit({
      windowMs: 10 * 1000 * 60,
      max: 1000,
      message:
        'Too many requests from this IP, please try again in 10 minutes 🔒',
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(Number(process.env.PORT));
  Logger.log(
    `🚀  Server ready at ${process.env.HOST}:${process.env.PORT}/${PREFIX}`,
  );
}

const setDocumentation = (app) => {
  const config = new DocumentBuilder()
    .setTitle('Cristolândia')
    .setDescription('Documentation app')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Cristolândia',
  });
};

bootstrap().catch((e) => {
  Logger.error(`❌  Error starting server. ${e}`, 'Bootstrap');
  throw e;
});
