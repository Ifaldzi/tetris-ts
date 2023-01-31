import UI from './UI';

class Text extends UI {
  private text: string;

  constructor(elementId: string, defaultText: string) {
    super(elementId);
    this.text = defaultText;
  }

  public changeText(newText: string) {
    this.text = newText;
    this.rewrite();
  }

  private rewrite() {
    if (this.htmlElement) {
      this.htmlElement.innerText = this.text;
    }
  }
}

export default Text;
