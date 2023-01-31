import { Constants } from './Constants';
import manager from './GameManager';
import Text from './ui/Text';

class ScoreManager {
  private score: number = 0;
  private lineTotal: number = 0;
  private scoreText: Text;

  constructor() {
    this.scoreText = new Text(Constants.SCORE_ELEMENT_ID, `Score: ${this.score}`);
  }

  public increaseScore(lineCount: number) {
    let increment: number = 0;
    switch (lineCount) {
      case 1:
        increment = 40 * (manager.level + 1);
        break;
      case 2:
        increment = 100 * (manager.level + 1);
        break;
      case 3:
        increment = 300 * (manager.level + 1);
        break;
      case 4:
        increment = 1200 * (manager.level + 1);
        break;
    }

    this.lineTotal += lineCount;
    if (this.lineTotal >= (manager.level + 1) * 10) manager.increaseLevel();

    this.score += increment;
    this.rewriteScore();
  }

  public resetScore() {
    this.score = 0;
    this.lineTotal = 0;
    this.rewriteScore();
  }

  private rewriteScore() {
    this.scoreText.changeText(`Score: ${this.score}`);
  }
}

export default new ScoreManager();
