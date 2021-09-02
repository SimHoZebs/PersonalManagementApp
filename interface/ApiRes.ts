export default interface ApiRes {
  res?: unknown;
  error?: string | unknown;
  success: boolean;
}