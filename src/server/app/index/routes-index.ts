import {Application} from 'express';
import { idRoutes } from '../shared/id/id-routes';

export function init(app: Application) {
  idRoutes(app);
}
