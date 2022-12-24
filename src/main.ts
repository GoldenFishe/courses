import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  try {
    const result = await app.listen(
      6000,
      () => `Server up adn running on ${6000}`,
    );
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

bootstrap();
