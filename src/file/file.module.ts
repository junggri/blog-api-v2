import { Module } from '@nestjs/common';
import { FileService } from '@src/file/file.service';
import { FileResolver } from '@src/file/file.resolver';

@Module({
  imports: [],
  providers: [
    FileService,
    FileResolver,
  ],
  exports: [
    FileService,
  ],
})

export class FileModule {
}
