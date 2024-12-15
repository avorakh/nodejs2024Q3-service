import { Module } from '@nestjs/common';
import { LoggingService } from 'src/logging.service';

@Module({
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggerModule {}
