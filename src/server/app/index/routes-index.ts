import * as express from 'express';
import { idRoutes } from '../shared/id/id-routes';

export function init(app: express.Application) {
  idRoutes(app);
}
