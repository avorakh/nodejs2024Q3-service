import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmDataSource } from '../typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(OrmDataSource.options)],
})
export class DataSourceModule {}
