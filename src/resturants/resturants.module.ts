import { Module } from '@nestjs/common';
import { ResturantsController } from './resturants.controller';
import { ResturantsService } from './resturants.service';
import { ResturantSchema } from './schemas/resturants.scheema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Resturant', schema: ResturantSchema }]),
  ],
  controllers: [ResturantsController],
  providers: [ResturantsService],
  exports: [MongooseModule],
})
export class ResturantsModule {}
