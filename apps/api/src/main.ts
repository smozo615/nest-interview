import * as process from 'process';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
// import helmet from 'helmet';

import {
  getApp,
  createSwaggerDocument,
  globalPrefix,
} from '@ocmi/api/bootstrap';

async function bootstrap() {
  const app = await getApp();

  app.enableCors();
  // app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const document = createSwaggerDocument(app);

  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  const port = process.env.APP_PORT || 3000;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
