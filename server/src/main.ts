import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const corsOptions: CorsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };
  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
