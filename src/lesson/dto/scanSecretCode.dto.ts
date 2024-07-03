import { ApiProperty } from "@nestjs/swagger";

export class ScanSecretCodeDto {
   @ApiProperty({ example: 1, description: 'Lesson id to set secret code' })
   readonly lessonId: number;

   @ApiProperty({ example: 'JAMAL SIGMA', description: 'Secret code' })
   readonly code: string

   @ApiProperty({ example: 'token example', description: 'student token' })
   readonly token: string

}