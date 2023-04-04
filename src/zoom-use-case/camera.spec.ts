import { Camera } from './camera';

describe('Camera update zoom', () => {
  let camera: Camera;
  beforeEach(() => {
    camera = Camera.create();
  });

  it('should update zoom to 0.75 when cursorYOffset is negative', () => {
    camera.updateZoom(1);
    expect(camera.zoom).toBe(0.75);
  });
});
