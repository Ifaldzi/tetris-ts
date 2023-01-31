class UI {
  protected htmlElement: HTMLElement | null;

  constructor(elementId: string) {
    this.htmlElement = document.getElementById(elementId);
  }
}

export default UI;
