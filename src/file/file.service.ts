import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, join } from 'path'
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
    async getImage(file: any): Promise<string> {
        try {
            const filename = uuidv4() + '.jpg'
            const filepath = resolve(__dirname, '..', 'static')

            if (!(existsSync(filepath))) {
                mkdirSync(filepath, { recursive: true })
            }
            writeFileSync(join(filepath, filename), file.buffer)
            return filename
        } catch (e) {
            throw new HttpException('file loading error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
