import { ICamera } from './icamera';
import { ScreenPoint } from './screen-point';
import { ZoomDTO } from './zoom-dto';

export class ZoomController {
  private constructor(private camera: ICamera) {}

  static create(camera: ICamera) {
    return new ZoomController(camera);
  }

  execute(cursorPointer: ScreenPoint, cursorYOffset: number): ZoomDTO {
    this.camera.updateScale(cursorYOffset);
    const canvasPoint =
      this.camera.convertPointFromScreenToCanvas(cursorPointer);

    return this.camera.getZoom(canvasPoint);
  }
}
