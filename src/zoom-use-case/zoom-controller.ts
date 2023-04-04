import { Camera } from './Camera';
import { ScreenPoint } from './screen-point';

export class ZoomController {
  private constructor(private camera: Camera) {}

  static create(camera: Camera) {
    return new ZoomController(camera);
  }

  execute(cursorPointer: ScreenPoint, cursorYOffset: number) {
    return {
      zoom: 1,
      canvasPosition: { x: 0, y: 0 },
    };
  }
}
