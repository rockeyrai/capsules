// utils/splitText.ts
export class SimpleSplit {
  element: HTMLElement;
  lines: HTMLElement[];
  originalHTML: string;

  constructor(element: HTMLElement) {
    this.element = element;
    this.originalHTML = element.innerHTML;
    this.lines = [];

    this.splitLines();
  }

  private splitLines() {
    // Split text content into words
    const words = this.element.textContent?.split(" ") || [];
    this.element.innerHTML = "";

    let lineContainer = document.createElement("div");
    lineContainer.style.display = "block";
    lineContainer.style.overflow = "hidden";
    this.element.appendChild(lineContainer);

    words.forEach((word, i) => {
      const span = document.createElement("span");
      span.textContent = word + (i < words.length - 1 ? " " : "");
      span.style.display = "inline-block";
      lineContainer.appendChild(span);
    });

    this.lines = [lineContainer];
  }

  revert() {
    this.element.innerHTML = this.originalHTML;
  }
}
