import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as sharp from 'sharp';
import * as fs from 'fs/promises';

@Injectable()
export class ImageProccesingService {
    private readonly logger = new Logger(ImageProccesingService.name);

    async proccesImage(imageUrl: string) {
        this.logger.log(`Завантаження зображення: ${imageUrl}`);

        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);

        this.logger.log('Ресайз');

        const resizedImage = await sharp(buffer).resize(1000, 700).toBuffer();

        const filePath = `resized-${Date.now()}.jpg`;
        await fs.writeFile(`./uploads/${filePath}`, resizedImage);

        this.logger.log(`Зображення збережено в ${filePath}`);

        return filePath;
    }
}
