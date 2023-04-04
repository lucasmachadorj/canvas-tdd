import { ICamera } from './icamera';
import { ScreenPoint } from './screen-point';

export class ZoomController {
  private constructor(private camera: ICamera) {}

  static create(camera: ICamera) {
    return new ZoomController(camera);
  }

  execute(cursorPointer: ScreenPoint, cursorYOffset: number) {
    this.camera.updateZoom(cursorYOffset);
    return {
      zoom: this.camera.zoom,
      cursorPositionInCanvas: { x: 0, y: 0 },
    };
  }
}
