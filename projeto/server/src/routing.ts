import {type Express} from 'express';
import apiRouter from './routes/api.route';
import scrapingRouter from './routes/scraping.route';

export default function routing(app: Express): void{
  app.use('/scraping', scrapingRouter);
  app.use('/api', apiRouter);
}

