import { ICamera } from './icamera';
import { ZoomController } from './zoom-controller';

describe('ZoomController execute method', () => {
  let fakeCamera: ICamera;
  let zoomController: ZoomController;
  beforeEach(() => {
    fakeCamera = {
      x: 0,
      y: 0,
      zoom: 1.25,
    };
    zoomController = ZoomController.create(fakeCamera);
  });

  it('should return zoom as 1.25 and cursorPositionInCanvas as (0, 0) when cursorPointer is in screen origin and cursorYOffset is positive', () => {
    const cursorPointer = {
      x: 0,
      y: 0,
    };
    const cursorYOffset = 1;
    const zoomOutputDTO = zoomController.execute(cursorPointer, cursorYOffset);

    expect(zoomOutputDTO.zoom).toBe(1.25);
    expect(zoomOutputDTO.cursorPositionInCanvas).toEqual({ x: 0, y: 0 });
  });
});
