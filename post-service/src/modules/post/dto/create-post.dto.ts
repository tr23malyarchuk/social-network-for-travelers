// src/modules/post/dto/create-post.dto.ts
export class CreatePostDto {
  readonly title: string;
  readonly content: string;
  readonly authorId: number; // например, идентификатор пользователя, который создает пост
}
