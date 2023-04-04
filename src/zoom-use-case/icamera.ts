export interface ICamera {
  x: number;
  y: number;
  zoom: number;
  updateZoom(cursorYOffset: number): void;
}
