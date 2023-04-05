import { ICamera } from './icamera';
import { ZoomController } from './zoom-controller';

const createMockCamera = (): ICamera => {
  const mockCamera: ICamera = {
    position: { x: 0, y: 0 },
    scale: 1,
    updateScale: (cursorYOffset) => {
      mockCamera.scale =
        cursorYOffset > 0 ? mockCamera.scale * 1.25 : mockCamera.scale * 0.75;
    },
    convertPointFromScreenToCanvas: (screenPoint) => {
      const x = screenPoint.x / mockCamera.scale - mockCamera.position.x;
      const y = screenPoint.y / mockCamera.scale - mockCamera.position.y;

      return { x, y };
    },
    getZoom: (canvasPoint) => {
      return {
        scale: mockCamera.scale,
        fixedPoint: { x: canvasPoint.x, y: canvasPoint.y },
      };
    },
  };

  return mockCamera;
};

describe('ZoomController execute method', () => {
  let mockCamera: ICamera;
  let zoomController: ZoomController;
  beforeEach(() => {
    mockCamera = createMockCamera();
    zoomController = ZoomController.create(mockCamera);
  });

  it('should return zoom as 1.25 and fixedPoint as (0, 0) when cursorPointer is in screen origin and cursorYOffset is positive', () => {
    const cursorPointer = {
      x: 0,
      y: 0,
    };
    const cursorYOffset = 1;
    const zoomOutputDTO = zoomController.execute(cursorPointer, cursorYOffset);

    expect(zoomOutputDTO.scale).toBe(1.25);
    expect(zoomOutputDTO.fixedPoint).toEqual({ x: 0, y: 0 });
  });

  it('should return zoom as 0.75 and fixedPoint as (0, 0) when cursorPointer is in screen origin and cursorYOffset is negative', () => {
    const cursorPointer = {
      x: 0,
      y: 0,
    };
    const cursorYOffset = -1;
    const zoomOutputDTO = zoomController.execute(cursorPointer, cursorYOffset);

    expect(zoomOutputDTO.scale).toBe(0.75);
    expect(zoomOutputDTO.fixedPoint).toEqual({ x: 0, y: 0 });
  });

  it('should return zoom as 1.25 and fixedPoint as (32, 32) when cursorPointer is in (40, 40) and cursorYOffset is positive', () => {
    const cursorPointer = {
      x: 40,
      y: 40,
    };
    const cursorYOffset = 1;
    const zoomOutputDTO = zoomController.execute(cursorPointer, cursorYOffset);

    expect(zoomOutputDTO.scale).toBe(1.25);
    expect(zoomOutputDTO.fixedPoint).toEqual({ x: 32, y: 32 });
  });

  it('should return zoom as 0.75 and fixedPoint as (48, -67) when cursorPointer is in (40, 40) and cursorYOffset is negative', () => {
    const cursorPointer = {
      x: 48,
      y: -50,
    };
    const cursorYOffset = -1;
    const zoomOutputDTO = zoomController.execute(cursorPointer, cursorYOffset);

    expect(zoomOutputDTO.scale).toBe(0.75);
    expect(zoomOutputDTO.fixedPoint.x).toBeCloseTo(64);
    expect(zoomOutputDTO.fixedPoint.y).toBeCloseTo(-66.67);
  });

  it('should return zoom as 1.25 and fixedPoint as (22, 22) when cursorPointer is in (40, 40), camera is positioned in (10, 10) and cursorYOffset is positive', () => {
    mockCamera.position.x = 10;
    mockCamera.position.y = 10;
    const cursorPointer = {
      x: 40,
      y: 40,
    };
    const cursorYOffset = 1;
    const zoomOutputDTO = zoomController.execute(cursorPointer, cursorYOffset);

    expect(zoomOutputDTO.scale).toBe(1.25);
    expect(zoomOutputDTO.fixedPoint).toEqual({ x: 22, y: 22 });
  });

  it('should return zoom as 1.5625 and fixedPoint as (15.6, 15.6) when cursorPointer is in (40, 40), camera is positioned in (10, 10) and cursorYOffset is positive and initial zoom is 1.25', () => {
    mockCamera.scale = 1.25;
    mockCamera.position.x = 10;
    mockCamera.position.y = 10;
    const cursorPointer = {
      x: 40,
      y: 40,
    };
    const cursorYOffset = 1;
    const zoomOutputDTO = zoomController.execute(cursorPointer, cursorYOffset);
    expect(zoomOutputDTO.scale).toBe(1.5625);
    expect(zoomOutputDTO.fixedPoint.x).toBeCloseTo(15.6);
    expect(zoomOutputDTO.fixedPoint.y).toBeCloseTo(15.6);
  });
});
