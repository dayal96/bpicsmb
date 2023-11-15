export interface BpicsmnRequest {
  type: RequestType;
  id: string;
  content: string;
  title: string;
  saved: boolean;
  url: string;
  headers: [string, string][];
  params: [string, string][];
  body?: string;
}

export enum RequestType {
  GET,
  POST,
  PUT,
  DELETE,
}
