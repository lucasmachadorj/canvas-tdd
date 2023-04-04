import { ICamera } from './icamera';
import { ScreenPoint } from './screen-point';

export class ZoomController {
  private constructor(private camera: ICamera) {}

  static create(camera: ICamera) {
    return new ZoomController(camera);
  }

  execute(cursorPointer: ScreenPoint, cursorYOffset: number) {
    return {
      zoom: 1.25,
      cursorPositionInCanvas: { x: 0, y: 0 },
    };
  }
}
