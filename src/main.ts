import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 8080;

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://dashboard-d8am2mhjp-rezanicgils-projects.vercel.app',
      'https://dashboard-kappa-five-66.vercel.app',
      'https://dashboard-aim6zhiyi-rezanicgils-projects.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();