import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';

@Catch(BadRequestException)
export class DeleteFileOnErrorFilter implements ExceptionFilter {
  private readonly logger: Logger;
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();

    if (request.file) {
      fs.unlink(request.file.path, (err) => {
        if (err) {
          this.logger.error(`There was a problem unlinking the file ${err}`);
          return err;
        }
      });
    }

    response.status(status).json(exception.getResponse());
  }
}
