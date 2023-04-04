import { ICamera } from './icamera';

export class Camera implements ICamera {
  private _x: number;
  private _y: number;
  private _zoom: number;

  private constructor() {
    this._x = 0;
    this._y = 0;
    this._zoom = 1;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get zoom() {
    return this._zoom;
  }

  updateZoom(cursorYOffset: number) {
    return;
  }

  public static create() {
    return new Camera();
  }
}