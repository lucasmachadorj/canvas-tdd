import { Camera } from './camera';

describe('Camera update zoom', () => {
  let camera: Camera;
  beforeEach(() => {
    camera = Camera.create();
  });

  it('should update zoom to 0.75 when cursorYOffset is negative', () => {
    camera.updateScale(-1);
    expect(camera.scale).toBe(0.75);
  });

  it('should update zoom to 1.25 when cursorYOffset is positive', () => {
    camera.updateScale(1);
    expect(camera.scale).toBe(1.25);
  });
});

describe('Camera transform point from screen to canvas', () => {
  let camera: Camera;
  beforeEach(() => {
    camera = Camera.create();
  });

  it('should return (0, 0) when screen point is (0, 0) for any zoom such as 1.25', () => {
    const screenPoint = {
      x: 0,
      y: 0,
    };

    camera.updateScale(1);
    const canvasPoint = camera.convertPointFromScreenToCanvas(screenPoint);
    expect(canvasPoint).toEqual({ x: 0, y: 0 });
  });

  it('should return (32, 32) when screen point is (40, 40) when zoom is 1.25', () => {
    const screenPoint = {
      x: 40,
      y: 40,
    };
    camera.updateScale(1);
    const canvasPoint = camera.convertPointFromScreenToCanvas(screenPoint);
    expect(canvasPoint).toEqual({ x: 32, y: 32 });
  });
});
