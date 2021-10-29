export default function isLoaded<T>(source: T | undefined): source is T {
  return source !== undefined;
}