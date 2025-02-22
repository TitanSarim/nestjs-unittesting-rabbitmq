import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResturantsModule } from './resturants/resturants.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MealModule } from './meal/meal.module';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    ResturantsModule,
    AuthModule,
    MealModule,
  ],
  controllers: [AppController],
  providers: [AppService, RabbitmqService],
})
export class AppModule {}
