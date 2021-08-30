export default interface IapiRes {
  res?: unknown;
  error?: string | unknown;
  success: boolean;
}