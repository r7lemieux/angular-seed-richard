
import * as BPromise from 'bluebird';
import * as AWS from 'aws-sdk';
AWS.config.setPromisesDependency(require('bluebird'));
