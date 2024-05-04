export type RequestMethod = 'GET';

export interface RequestOptions {
  method: RequestMethod;
  headers: Record<string, string>;
}
