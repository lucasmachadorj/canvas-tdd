import { CanvasPoint } from './canvas-point';
import { ICamera } from './icamera';
import { ScreenPoint } from './screen-point';

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
    this._zoom = cursorYOffset > 0 ? this.zoom * 1.25 : this.zoom * 0.75;
  }

  transformPointFromScreenToCanvas(screenPoint: ScreenPoint): CanvasPoint {
    const x = screenPoint.x / this.zoom - this.x;
    const y = screenPoint.y / this.zoom - this.y;

    return { x, y };
  }

  public static create() {
    return new Camera();
  }
}
