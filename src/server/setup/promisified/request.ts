import * as BPromise from 'bluebird';
import * as request from 'request';
import RequestResponse = request.RequestResponse;
BPromise.promisifyAll(request);

import {CoreOptions, RequestAPI, RequiredUriUrl} from 'request';
import Request = request.Request;

export interface RequestResponseAsync extends RequestResponse {
  body: string;
};

export interface RequestAsync<Request, CoreOptions, RequiredUriUrl> extends RequestAPI<request.Request, CoreOptions, RequiredUriUrl> {
  putAsync?(uri: string, options?: CoreOptions): BPromise<RequestResponseAsync>;
};

export const requestAsync: RequestAsync<Request, CoreOptions, RequiredUriUrl> = request;
