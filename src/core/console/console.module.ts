import { Global, Module } from '@nestjs/common';
import { ConsoleService } from './console.service';

@Global()
@Module({
  providers: [ConsoleService],
  exports: [ConsoleService],
})
export class ConsoleModule {}
