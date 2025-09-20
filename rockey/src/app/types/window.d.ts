export {}; // this makes the file a module

declare global {
  interface Window {
    duplicateIcons?: HTMLElement[] | null;
  }
}
