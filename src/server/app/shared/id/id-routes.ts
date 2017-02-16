import {idService} from "./id-service";
import {Application, Request, Response} from 'express';


export function idRoutes(app: Application) {
  app.get('/api/id', function (req, res) {
    res.send('GET request to id route')
  });

  app.get('/api/generateId', function (req , res) {
    idService.generateId(req.query.key, res)
  });

// POST method route
  app.post('/', function (req, res) {
    res.send('POST request to id route')
  })
}
