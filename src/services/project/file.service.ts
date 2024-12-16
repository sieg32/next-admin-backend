import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import Images from '../../models/projects/Image.model';
import Project from '../../models/projects/project.model';
import { ulid } from 'ulidx';
import config from '../../config/config';
import Brochures from '../../models/projects/brochure.model';

class FileService {
  private s3: S3Client;
  private bucketName: string;

  constructor(storageS3: S3Client) {
    // AWS S3 configuration should be handled in the constructor
    this.s3 = storageS3;
    this.bucketName = config.s3.AWS_S3_BUCKET_NAME;
    if (!this.bucketName) {
      throw new Error('Missing S3 bucket name');
    }
  }

  // Upload image to S3 using AWS SDK v3
  private async uploadImageToS3(file: Express.Multer.File): Promise<{ key: string; location: string }> {
    const key = `project/images/${ulid()}-${file.originalname}`;
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    };

    try {
      const command = new PutObjectCommand(params);
      await this.s3.send(command);

      const location = `https://${this.bucketName}.s3.${config.s3.AWS_REGION}.amazonaws.com/${key}`;
      return { key, location };
    } catch (error) {
      throw new Error(`Failed to upload image to S3: ${error.message}`);
    }
  }

  // Upload brochure (PDF) to S3 using AWS SDK v3
  public async uploadBrochureToS3( brochureFile: Express.Multer.File): Promise<{ key: string; location: string }> {
    const key = `project/brochures/${ulid()}-${brochureFile.originalname}`;
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: brochureFile.buffer,
      ACL: 'public-read',
      ContentType: brochureFile.mimetype || 'application/pdf', // Default to 'application/pdf' if mimetype is not available
    };

    try {
      const command = new PutObjectCommand(params);
      await this.s3.send(command);

      const location = `https://${this.bucketName}.s3.${config.s3.AWS_REGION}.amazonaws.com/${key}`;
      return { key, location };
    } catch (error) {
      throw new Error(`Failed to upload brochure to S3: ${error.message}`);
    }
  }

  // Add images function to upload and save metadata to the database
  public async addImages(projectId: string, imageFiles: Express.Multer.File[]) {
    // Ensure the project exists
    const project = await Project.findByPk(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    // Handle uploading each image to S3 and saving metadata in the DB
    const uploadedImages = await Promise.all(
      imageFiles.map(async (file) => {
        const { key, location } = await this.uploadImageToS3(file);
        return Images.create({
          project_id: projectId,
          file_name: key,
          image_url: location,
        });
      })
    );

    return uploadedImages;
  }
  public async addBrochure(projectId: string, files: Express.Multer.File[]) {
    // Ensure the project exists
    const project = await Project.findByPk(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    // Handle uploading each image to S3 and saving metadata in the DB
    const uploadedBrochures = await Promise.all(
      files.map(async (file) => {
        const { key, location } = await this.uploadBrochureToS3(file);
        return Brochures.create({
          project_id: projectId,
          file_name: key,
          brochure_url: location,
        });
      })
    );

    return uploadedBrochures;
  }


  public async deleteImages(imageKeys: string[]): Promise<{ deletedKeys: string[]; errors: string[] }> {
    const deletedKeys: string[] = [];
    const errors: string[] = [];

    // Iterate over the array of image keys to delete them individually
    await Promise.all(
      imageKeys.map(async (key) => {
        try {
          // Delete the image from S3
          const params = {
            Bucket: this.bucketName,
            Key: key,
          };

          const command = new DeleteObjectCommand(params);
          await this.s3.send(command);

          // Remove the image metadata from the database
          const deletedRecord = await Images.destroy({ where: { file_name: key } });

          if (deletedRecord > 0) {
            deletedKeys.push(key);
          } else {
            errors.push(`No database record found for key: ${key}`);
          }
        } catch (error) {
          errors.push(`Failed to delete key: ${key}. Error: ${error.message}`);
        }
      })
    );

    return { deletedKeys, errors };
  }

  public async deleteBrochure(brochureKey: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Delete from S3
      const params = {
        Bucket: this.bucketName,
        Key: brochureKey,
      };

      const command = new DeleteObjectCommand(params);
      await this.s3.send(command);

      // Delete from database
      await Brochures.destroy({ where: { file_name: brochureKey } });

      return { success: true };
    } catch (error) {
      return { success: false, error: `Failed to delete brochure with key ${brochureKey}: ${error.message}` };
    }
  }

}

export default FileService;
