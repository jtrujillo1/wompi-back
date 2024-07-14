import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleService } from './core/console/console.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/financial-management');
  app.enableCors();
  const service = new ConsoleService();
  const port = process.env.PORT;
  //service.colorMatriz();

  service.title('FINALCIAL MANAGEMENT SERVICE');
  service.valueMesssage('Contexto de base de datos')(process.env.DB_NAME);
  service.valueMesssage('El servicio esta corriendo en el puerto')(port);
  await app.listen(port);
}
bootstrap();
