"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  // Specify type of the refs: container is a div (HTMLDivElement), highlight too
  const containerRef = useRef<HTMLDivElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const container = containerRef.current;
  const highlight = highlightRef.current;

  if (!container || !highlight) return; // safety check

  const gridItems = container.querySelectorAll<HTMLDivElement>(".grid-item");

  const highlightColors = [
    "#1B263B", "#2C3E50", "#34495E", "#4A235A",
    "#1C2833", "#212F3D", "#2E4053", "#283747",
    "#17202A", "#3B3B3B", "#3E2F5B", "#2D2D2D",
  ];

  gridItems.forEach((item, index) => {
    item.dataset.color = highlightColors[index % highlightColors.length];
  });

  const moveToElement = (element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    highlight.style.transform = `translate(${rect.left - containerRect.left}px, ${rect.top - containerRect.top}px)`;
    highlight.style.width = `${rect.width}px`;
    highlight.style.height = `${rect.height}px`;
    highlight.style.backgroundColor = element.dataset.color || "transparent";
  };

  const moveHighlight = (e: MouseEvent) => {
    const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);

    if (
      hoveredElement &&
      (hoveredElement as HTMLElement).classList.contains("grid-item")
    ) {
      moveToElement(hoveredElement as HTMLDivElement);
    } else if (
      hoveredElement &&
      hoveredElement.parentElement &&
      hoveredElement.parentElement.classList.contains("grid-item")
    ) {
      moveToElement(hoveredElement.parentElement as HTMLDivElement);
    }
  };

  const firstItem = gridItems[0];
  if (firstItem) {
    moveToElement(firstItem);
  }

  container.addEventListener("mousemove", moveHighlight);

  return () => {
    container.removeEventListener("mousemove", moveHighlight);
  };
}, []);

  return (
    <>
      <nav>
        <p>Feature</p>
        <p>Test for feature layout</p>
      </nav>
      <div className="container" ref={containerRef}>
        <div className="grid">
          <div className="grid-row">
            <div className="grid-item">
              <p>item1</p>
            </div>
            <div className="grid-item">
              <p>item2</p>
            </div>
            <div className="grid-item">
              <p>item3</p>
            </div>
          </div>
          <div className="grid-row">
            <div className="grid-item">
              <p>item4</p>
            </div>
            <div className="grid-item">
              <p>item5</p>
            </div>
            <div className="grid-item">
              <p>item6</p>
            </div>
            <div className="grid-item">
              <p>item7</p>
            </div>
            <div className="grid-item">
              <p>item8</p>
            </div>
            <div className="grid-item">
              <p>item9</p>
            </div>
          </div>
        </div>
        <div className="highlight" ref={highlightRef}></div>
      </div>
      <footer>
        <p>Test for footer layout</p>
      </footer>
    </>
  );
}
