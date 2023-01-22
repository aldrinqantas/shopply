import * as express from 'express';

import handleError from './middlewares/handleError';

import publicRoutes from './routes/public';
import supplierRoutes from './routes/supplier';
import userRoutes from './routes/user';

export default function api(server: express.Express) {
  server.use('/api/v1/public', publicRoutes, handleError);
  server.use('/api/v1/supplier', supplierRoutes, handleError);
  server.use('/api/v1/user', userRoutes, handleError);
}
