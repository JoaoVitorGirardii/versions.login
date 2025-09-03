import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Documentação Versions.login')
    .setDescription(
      'Documentação gerada com Swagger + Scallar para visualização dos endpoint do projeto',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  app.use(
    '/api/reference',
    apiReference({
      spec: { content: document },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => console.log('Error in project [LOGIN]: ', error));
