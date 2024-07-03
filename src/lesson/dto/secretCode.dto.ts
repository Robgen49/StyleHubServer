import { ApiProperty } from "@nestjs/swagger";

export class SecretCodeDto {
   @ApiProperty({ example: 1, description: 'Lesson id to set secret code' })
   readonly lessonId: number;

   @ApiProperty({ example: 'JAMAL SIGMA', description: 'Secret code' })
   readonly code: string

}