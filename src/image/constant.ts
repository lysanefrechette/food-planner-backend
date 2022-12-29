import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
export const getUniqueFileName = (
  _request: unknown,
  file: Express.Multer.File,
  callback: (error: Error | null, fileName: string) => void,
) => {
  const name = file.originalname.split('.')[0];
  const extension = extname(file.originalname);
  const randomUuid = uuidv4();
  callback(null, `${name}-${randomUuid}${extension}`);
};
