import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';

import { Camera } from './camera';
import { ScreenPoint } from './screen-point';
import { ZoomOutputDTO } from './zoom-output-dto';
import { ZoomController } from './zoom-controller';

const feature = loadFeature(path.join(__dirname, './zoom.feature'));

defineFeature(feature, (test) => {
  let camera: Camera;
  let zoomController: ZoomController;
  let cursorPointer: ScreenPoint;
  let zoomOutputDTO: ZoomOutputDTO;

  beforeEach(() => {
    camera = Camera.create();
    zoomController = ZoomController.create(camera);
  });

  test('Zoom in on Mouse Wheel Up', ({ given, when, then }) => {
    given('the user is in the whiteboard', () => {
      cursorPointer = {
        x: 40,
        y: 40,
      };
    });
    when('the user scrolls up the mouse wheel', () => {
      const cursorYOffset = 1;
      zoomOutputDTO = zoomController.execute(cursorPointer, cursorYOffset);
    });
    then('the whiteboard should zoom in around the cursor position', () => {
      const { zoom, canvasPosition } = zoomOutputDTO;
      expect(zoom).toBe(1.25);
      expect(canvasPosition).toEqual({ x: 32, y: 32 });
    });
  });
});
