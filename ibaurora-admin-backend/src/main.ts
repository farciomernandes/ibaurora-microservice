import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
const PREFIX = 'api/v1';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${configService.get<string>(
          'RABBITMQ_USER',
        )}:${configService.get<string>(
          'RABBITMQ_PASSWORD',
        )}@${configService.get<string>('RABBITMQ_URL')}`,
      ],
      noAck: false,
      queue: 'admin-backend',
    },
  });

  await app.listen();

  Logger.log(
    `🚀  Server ready at ${process.env.HOST}:${process.env.PORT}/${PREFIX}`,
  );
}

bootstrap().catch((e) => {
  Logger.error(`❌  Error starting server. ${e}`, 'Bootstrap');
  throw e;
});
