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

  test('Zoom in', ({ given, when, then }) => {
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
      const { zoom, cursorPositionInCanvas } = zoomOutputDTO;
      expect(zoom).toBe(1.25);
      expect(cursorPositionInCanvas).toEqual({ x: 32, y: 32 });
    });
  });

  test('Zoom out', ({ given, when, then }) => {
    given('the user is in the whiteboard', () => {
      cursorPointer = {
        x: 40,
        y: 40,
      };
    });
    when('the user scrolls down the mouse wheel', () => {
      const cursorYOffset = -1;
      zoomOutputDTO = zoomController.execute(cursorPointer, cursorYOffset);
    });
    then('the whiteboard should zoom out around the cursor position', () => {
      const { zoom, cursorPositionInCanvas } = zoomOutputDTO;
      expect(zoom).toBe(0.75);
      expect(cursorPositionInCanvas.x).toBeCloseTo(53.333);
      expect(cursorPositionInCanvas.y).toBeCloseTo(53.333);
    });
  });

  test('Zoom in and out', ({ given, when, and, then }) => {
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
    and('the user scrolls down the mouse wheel at the same position', () => {
      const cursorYOffset = -1;
      zoomOutputDTO = zoomController.execute(cursorPointer, cursorYOffset);
    });
    then('the whiteboard should zoom out around the cursor position', () => {
      const { zoom, cursorPositionInCanvas } = zoomOutputDTO;
      expect(zoom).toEqual(0.9375);
      expect(cursorPositionInCanvas.x).toBeCloseTo(42.666);
      expect(cursorPositionInCanvas.y).toBeCloseTo(42.666);
    });
  });

  test('Zoom in and out at different positions', ({
    given,
    when,
    and,
    then,
  }) => {
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
    and('the user scrolls down the mouse wheel at a different position', () => {
      cursorPointer = {
        x: 20,
        y: 20,
      };
      const cursorYOffset = -1;
      zoomOutputDTO = zoomController.execute(cursorPointer, cursorYOffset);
    });
    then(
      'the whiteboard should zoom out around the last cursor position',
      () => {
        const { zoom, cursorPositionInCanvas } = zoomOutputDTO;
        expect(zoom).toEqual(0.9375);
        expect(cursorPositionInCanvas.x).toBeCloseTo(21.33);
        expect(cursorPositionInCanvas.y).toBeCloseTo(21.33);
      },
    );
  });
});
