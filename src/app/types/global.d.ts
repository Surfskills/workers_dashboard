declare global {
  interface Calendly {
    initPopupWidget: (options: { url: string }) => void;
  }

  interface Window {
    Calendly: Calendly | undefined;
  }
}

export { }; // Ensures the file is treated as a module
