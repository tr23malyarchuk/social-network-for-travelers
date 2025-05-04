// src/modules/post/dto/post.dto.ts
export class PostDto {
    readonly title: string;
    readonly content: string;
    readonly text: string;
    readonly imageUrl?: string; // Может быть пустым, если не передается
    readonly userId: number;
  }
  