export interface IAutomationModel {
  image: string;
  name: string;
  port: number;
  position: number;
  host: string;
  id?: number;
  imageFile?: File;
  removeImage: boolean;
}
