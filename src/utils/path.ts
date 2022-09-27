import path from "path";

// at runtime this root will be a path to /dist directory
const _rootDir = require.main?.filename.replace("index.js", "") ?? "";

export function rootPath(...args: string[]): string {
  return path.join(_rootDir, ...args);
}

export function viewsPath(...args: string[]): string {
  return path.join(_rootDir, 'views', ...args);
}

export const rootDir = _rootDir;
