import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { UsersController } from 'src/modules/users/users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
