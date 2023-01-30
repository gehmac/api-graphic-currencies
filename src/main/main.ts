import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import process from 'process';
import { AppModule } from './app.module';

let app: INestApplication;

async function createAppModule(): Promise<NestExpressApplication> {
  const appModule = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  configureApp(appModule);

  return appModule;
}

function configureApp(appModule: NestExpressApplication): void {
  appModule.enableCors();
  appModule.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
}

async function getApp(): Promise<INestApplication> {
  if (!app) {
    app = await createAppModule();
    await app.init();
  }
  return app;
}

getApp()
  .then(async (main) => await main.listen(process.env.APP_PORT || 3001)
  .catch(console.error));
