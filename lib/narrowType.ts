export default function narrowType<T>(source: unknown): source is T {
  return source !== undefined;
}