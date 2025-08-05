/// <reference types="vite/client" />

declare global {
  interface Window {
    $zoho?: {
      salesiq?: {
        floatwindow?: {
          visible: (action: string) => void;
        };
      };
    };
  }
}
