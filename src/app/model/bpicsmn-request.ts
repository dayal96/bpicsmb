export interface BpicsmnRequest {
  type: RequestType;
  id: string;
  content: string;
  title: string;
  saved: boolean;
  url: string;
  headers: { [header: string]: string | string[] };
  params: { [param: string]: string | string[] };
  body?: string;
}

export enum RequestType {
  GET,
  POST,
  PUT,
}
