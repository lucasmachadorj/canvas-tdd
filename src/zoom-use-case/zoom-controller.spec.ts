import { ICamera } from './icamera';
import { ZoomController } from './zoom-controller';

describe('ZoomController execute method', () => {
  let fakeCamera: ICamera;
  let zoomController: ZoomController;
  beforeEach(() => {
    fakeCamera = {
      x: 0,
      y: 0,
      zoom: 1,
      updateZoom: (cursorYOffset) => {
        fakeCamera.zoom =
          cursorYOffset > 0 ? fakeCamera.zoom * 1.25 : fakeCamera.zoom * 0.75;
      },
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

  it('should return zoom as 0.75 and cursorPositionInCanvas as (0, 0) when cursorPointer is in screen origin and cursorYOffset is negative', () => {
    const cursorPointer = {
      x: 0,
      y: 0,
    };
    const cursorYOffset = -1;
    const zoomOutputDTO = zoomController.execute(cursorPointer, cursorYOffset);

    expect(zoomOutputDTO.zoom).toBe(0.75);
    expect(zoomOutputDTO.cursorPositionInCanvas).toEqual({ x: 0, y: 0 });
  });

  it('should return zoom as 1.25 and cursorPositionInCanvas as (32, 32) when cursorPointer is in (40, 40) and cursorYOffset is positive', () => {
    const cursorPointer = {
      x: 40,
      y: 40,
    };
    const cursorYOffset = 1;
    const zoomOutputDTO = zoomController.execute(cursorPointer, cursorYOffset);

    expect(zoomOutputDTO.zoom).toBe(1.25);
    expect(zoomOutputDTO.cursorPositionInCanvas).toEqual({ x: 32, y: 32 });
  });

  it('should return zoom as 0.75 and cursorPositionInCanvas as (48, -67) when cursorPointer is in (40, 40) and cursorYOffset is negative', () => {
    const cursorPointer = {
      x: 48,
      y: -50,
    };
    const cursorYOffset = -1;
    const zoomOutputDTO = zoomController.execute(cursorPointer, cursorYOffset);

    expect(zoomOutputDTO.zoom).toBe(0.75);
    expect(zoomOutputDTO.cursorPositionInCanvas.x).toBeCloseTo(64);
    expect(zoomOutputDTO.cursorPositionInCanvas.y).toBeCloseTo(-66.67);
  });
});
