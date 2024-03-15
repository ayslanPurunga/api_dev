import { Module } from '@nestjs/common';
import { DevelopersModule } from './developers/developers.module';
@Module({
  imports: [DevelopersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
