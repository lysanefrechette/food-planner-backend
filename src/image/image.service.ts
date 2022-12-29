import { Inject, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { ModelClass } from 'objection';
import { ImageModel } from '../database/models/image.model';

@Injectable()
export class ImageService {
  private readonly logger: Logger;
  constructor(
    @Inject('ImageModel') private modelClass: ModelClass<ImageModel>,
  ) {}
  getBase64Image(url: string): string {
    return fs.readFileSync(url, 'base64');
  }

  async getImageById(id: number): Promise<ImageModel> {
    const image = this.modelClass.query().findById(id);
    if (image) {
      return image;
    }
    this.logger.error('Image does not exist');
    return null;
  }
}
