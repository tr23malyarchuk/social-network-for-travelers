import { Module } from '@nestjs/common';
import { PostServiceClient } from './post.service.client';
import { UserServiceClient } from './user.service.client';

@Module({
  imports: [],
  providers: [PostServiceClient, UserServiceClient],
})
export class ModulesModule {}
