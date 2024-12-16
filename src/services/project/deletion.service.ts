import Amenities from "../../models/projects/amenity.model";
import Brochure from "../../models/projects/brochure.model";
import Images from "../../models/projects/Image.model";
import Projects from "../../models/projects/project.model";
import PropertyUnit from "../../models/projects/propertyUnit.model";
import s3 from '../../config/s3';
import FileService from "./file.service";
import logger from "../../config/logger";

const fileService = new FileService(s3);

export class DeletionService {
  public async deleteProject(projectId: string): Promise<void> {
    const project = await Projects.findByPk(projectId, {
      include: [Images, Brochure, Amenities, PropertyUnit],
    });

    if (!project) {
      throw new Error("NotFound");
    }

    try {
      // Delete associated images
      if (project.images && project.images.length > 0) {
        const imageKeys = project.images.map((image) => image.file_name);
        const { deletedKeys, errors } = await fileService.deleteImages(imageKeys);
        console.log('deleted keyss.....................', deletedKeys)
        if (errors.length > 0) {
          logger.error("Failed to delete some images:", errors);
        }
      }

      // Delete associated brochure
      if (project.brochure) {
        const { success, error } = await fileService.deleteBrochure(project.brochure.file_name);
        if (!success) {
          logger.error("Failed to delete brochure:", error);
        }
      }

      // Delete related database records
      await Amenities.destroy({ where: { project_id: projectId } });
      await PropertyUnit.destroy({ where: { project_id: projectId } });

      // Delete the project
      await project.destroy();
    } catch (error) {
      logger.error("Error while deleting project:", error.message);
      throw new Error("DeletionFailed");
    }
  }
}
