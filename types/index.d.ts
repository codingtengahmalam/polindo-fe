// ============================================================================
// Global Types Export - Polindo Frontend
// ============================================================================

// Re-export all types for easy imports
export * from "./common";
export * from "./category";
export * from "./article";
export * from "./video";
export * from "./tag";
export * from "./setting";
export * from "./pages";

declare global {
  type CustomObject<T = any> = {
    [key: string]: T;
  };
}
