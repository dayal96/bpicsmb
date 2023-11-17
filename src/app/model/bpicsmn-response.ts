export interface BpicsmnResponse {
  status: number;
  size: number;
  body: string;
  headers: [string, string][];
  timeMillis: number;
  type: ResponseType;
}

export enum ResponseType {
  TEXT,
  BINARY,
}
