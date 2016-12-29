import * as express from 'express';
import { nameList } from './name.list';

export function init(app: express.Application) {
    console.log('105 init index');
    nameList(app);
}
