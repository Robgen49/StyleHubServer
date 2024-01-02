import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
    const PORT = process.env.PORT || 5000;
    
    const app = await NestFactory.create(AppModule);
    app.enableCors()

    const config = new DocumentBuilder()
        .setTitle('StyleHub store ')
        .setDescription('API documentation')
        .setVersion('2.1.1')
        .build()

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/api/docs', app, document, {
        swaggerOptions: {
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
    })
    
    await app.listen(PORT, () => console.log(`Server started (PORT ${PORT})`))
}

start()