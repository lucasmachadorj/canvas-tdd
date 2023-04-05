import { ICamera } from './icamera';
import { ScreenPoint } from './screen-point';
import { ZoomOutputDTO } from './zoom-output-dto';

export class ZoomController {
  private constructor(private camera: ICamera) {}

  static create(camera: ICamera) {
    return new ZoomController(camera);
  }

  execute(cursorPointer: ScreenPoint, cursorYOffset: number): ZoomOutputDTO {
    this.camera.updateZoom(cursorYOffset);
    const { x, y } =
      this.camera.transformPointFromScreenToCanvas(cursorPointer);

    return {
      zoom: this.camera.zoom,
      cursorPositionInCanvas: { x, y },
    };
  }
}
