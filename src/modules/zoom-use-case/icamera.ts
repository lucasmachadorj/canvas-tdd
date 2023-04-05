import { CanvasPoint } from './canvas-point';
import { ScreenPoint } from './screen-point';
import { ZoomDTO } from './zoom-dto';

export interface ICamera {
  position: CanvasPoint;
  scale: number;
  updateScale(cursorYOffset: number): void;
  convertPointFromScreenToCanvas(screenPoint: ScreenPoint): CanvasPoint;
  getZoom(canvasPoint: CanvasPoint): ZoomDTO;
}
