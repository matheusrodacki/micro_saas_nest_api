import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './admin/users_admin/users.module';
import { ClientsModule } from './admin/clients/clients.module';
import { PlansModule } from './admin/plans/plans.module';
import { ContractsModule } from './admin/contracts/contracts.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração global de validação do DTO
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  //app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Configuração básica do Swagger
  const adminConfig = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('Admin API Documentation')
    .setContact(
      'HD Soltec',
      'https://www.hdsoltec.com.br',
      'equipehdbrasil@gmail.com',
    )
    .setVersion('1.0')
    .addBearerAuth() // Se estiver usando autenticação JWT
    .build();

  const adminDocument = SwaggerModule.createDocument(app, adminConfig, {
    include: [
      AuthModule,
      ClientsModule,
      UsersModule,
      PlansModule,
      ContractsModule,
    ],
  });
  SwaggerModule.setup('api-admin', app, adminDocument);

  //Enable CORS

  app.enableCors();

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
