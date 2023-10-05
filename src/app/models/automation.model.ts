import { IAutomationModel } from "./automation.model.interface";

export class AutomationModel implements IAutomationModel {
  private _name: string = "";
  private _image: string = "";
  private _host: string = "";
  private _port: number = -1;
  private _position: number = -1;
  private _id?: string = "";
  private _removeImage = false;

  constructor(
    name: string,
    image: string,
    host: string,
    port: number,
    position: number,
    removeImage: boolean,
    id?: string
  ) {
    this._name = name;
    this._image = image;
    this._host = host;
    this._port = port;
    this._position = position;
    this._id = id;
    this._removeImage = removeImage;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get host(): string {
    return this._host;
  }

  set host(value: string) {
    this._host = value;
  }

  get port(): number {
    return this._port;
  }

  set port(value: number) {
    this._port = value;
  }

  get position(): number {
    return this._position;
  }

  set position(value: number) {
    this._position = value;
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  get removeImage(): boolean {
    return this._removeImage;
  }

  set removeImage(value: boolean) {
    this._removeImage = value;
  }
}
