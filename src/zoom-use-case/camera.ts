import { CanvasPoint } from './canvas-point';
import { ICamera } from './icamera';
import { ScreenPoint } from './screen-point';
import { ZoomDTO } from './zoom-dto';

export class Camera implements ICamera {
  private _position: CanvasPoint;
  private _scale: number;

  private constructor() {
    this._position = { x: 0, y: 0 };
    this._scale = 1;
  }

  set position(position: CanvasPoint) {
    this.position.x = position.x;
    this.position.y = position.y;
  }

  get positionX() {
    return this._position.x;
  }

  get positionY() {
    return this._position.y;
  }

  get scale() {
    return this._scale;
  }

  updateScale(cursorYOffset: number) {
    this._scale = cursorYOffset > 0 ? this.scale * 1.25 : this.scale * 0.75;
  }

  convertPointFromScreenToCanvas(screenPoint: ScreenPoint): CanvasPoint {
    const x = screenPoint.x / this.scale - this.positionX;
    const y = screenPoint.y / this.scale - this.positionY;

    return { x, y };
  }

  getZoom(canvasPoint: CanvasPoint): ZoomDTO {
    return {
      scale: this.scale,
      fixedPoint: { x: canvasPoint.x, y: canvasPoint.y },
    };
  }

  public static create() {
    return new Camera();
  }
}
