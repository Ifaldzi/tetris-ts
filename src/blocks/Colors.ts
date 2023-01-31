export enum Colors {
  BLUE = 1,
  GREEN = 2,
  YELLOW = 3,
  ORANGE = 4,
  RED = 5,
}

export class Color {
  public static getColor(code: Colors) {
    switch (code) {
      case Colors.BLUE:
        return '#0341AE';
      case Colors.GREEN:
        return '#72CB3B';
      case Colors.YELLOW:
        return '#FFD500';
      case Colors.ORANGE:
        return '#FF971C';
      case Colors.RED:
        return '#FF3213';
      default:
        return 'black';
    }
  }

  public static getRandomColorCode(): Colors {
    return Math.floor(Math.random() * 5) + 1;
  }
}
