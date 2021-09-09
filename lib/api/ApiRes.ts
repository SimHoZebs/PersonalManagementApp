/**
 * @returns undefined: if request failed
 */
export default interface ApiRes {
  res?: unknown;
  error?: unknown;
  success: boolean;
}