export interface IAutomationModel {
  image: string;
  name: string;
  port: number;
  position: number;
  host: string;
  id?: string;
  imageFile?: File;
  removeImage: boolean;
}
