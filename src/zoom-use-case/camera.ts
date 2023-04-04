export class Camera {
  private x: number;
  private y: number;
  private zoom: number;

  private constructor() {
    this.x = 0;
    this.y = 0;
    this.zoom = 1;
  }

  public static create() {
    return new Camera();
  }
}
