import { Module } from '@nestjs/common';
import { AppService } from '@/main/app.service';
import { AppController } from '@/main/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
