import { CanvasPoint } from './canvas-point';
import { ScreenPoint } from './screen-point';

export interface ICamera {
  x: number;
  y: number;
  zoom: number;
  updateZoom(cursorYOffset: number): void;
  transformPointFromScreenToCanvas(screenPoint: ScreenPoint): CanvasPoint;
}
