
import * as BPromise from 'bluebird';
import * as fs from 'fs';
BPromise.promisifyAll(fs);

 declare interface FsAsync {
  readFileAsync?(filename: string, encoding: string): BPromise<string>;
  writeFileAsync?(filename: string, data?: any, options?: { encoding?: string; mode?: string; flag?: string; }): BPromise<null>;
}
export const fsAsync: FsAsync = fs;
//
// export interface RequestAsync<Request, CoreOptions, RequiredUriUrl> extends RequestAPI<request.Request, CoreOptions, RequiredUriUrl> {
//   putAsync?(uri: string, options?: CoreOptions): BPromise<RequestResponseAsync>;
// };
//
// export const requestAsync: RequestAsync<Request, CoreOptions, RequiredUriUrl> = request;
