import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AttachmentService {
  private readonly s3: S3;
  private readonly bucketName = process.env.AWS_BUCKET_NAME;
  private readonly region = process.env.AWS_DEFAULT_REGION;

  constructor() {
    this.s3 = new S3();
  }

  uploadFile(
    file: Express.Multer.File,
  ): Promise<{ key: string; uploadedUrl: string }> {
    const { originalname, buffer } = file;

    return this.uploadFileToS3(buffer, originalname);
  }

  downloadFile(key: string) {
    return this.s3
      .getObject({ Bucket: this.bucketName, Key: key })
      .createReadStream();
  }

  deleteFile(key: string) {
    return this.s3
      .deleteObject({
        Bucket: this.bucketName,
        Key: key,
      })
      .promise();
  }

  private async uploadFileToS3(file: Buffer, fileName: string): Promise<any> {
    const name = this.formatFileName(fileName);
    const fileObject = this.createObject(file, name);

    await this.s3.putObject(fileObject).promise();

    return {
      uploadedUrl: this.getObjectUrl(name),
      key: name,
    };
  }

  private createObject(
    file: Buffer,
    fileName: string,
  ): S3.Types.PutObjectRequest {
    return {
      Body: file,
      Key: fileName,
      Bucket: this.bucketName,
    };
  }

  private formatFileName(fileName: string): string {
    return uuid().concat('.', fileName.split('.')[1]);
  }

  private getObjectUrl(fileName: string): string {
    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`;
  }
}
