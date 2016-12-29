import * as express from 'express';

export function idRoutes(app: express.Application) {
  app.get('/', function (req, res) {
    res.send('GET request to id route')
  });

// POST method route
  app.post('/', function (req, res) {
    res.send('POST request to id route')
  })
}