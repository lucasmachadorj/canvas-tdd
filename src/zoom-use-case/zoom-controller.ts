import { ICamera } from './icamera';
import { ScreenPoint } from './screen-point';

export class ZoomController {
  private constructor(private camera: ICamera) {}

  static create(camera: ICamera) {
    return new ZoomController(camera);
  }

  execute(cursorPointer: ScreenPoint, cursorYOffset: number) {
    this.camera.updateZoom(cursorYOffset);
    const x = cursorPointer.x / this.camera.zoom - this.camera.x;
    const y = cursorPointer.y / this.camera.zoom - this.camera.y;

    return {
      zoom: this.camera.zoom,
      cursorPositionInCanvas: { x, y },
    };
  }
}
