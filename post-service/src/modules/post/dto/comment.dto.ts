// src/modules/post/dto/comment.dto.ts
export class commentDto {
    readonly content: string; // Контент комментария
    readonly userId: number;  // ID пользователя, который добавляет комментарий
    readonly postId: number;  // ID поста, к которому добавляется комментарий
    readonly text: string;    // Текст комментария
}
