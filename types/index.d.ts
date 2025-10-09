declare global {
  type CustomObject<T = any> = {
    [key: string]: T;
  };
}
