import type { User as UserDoc } from '../models/User';
import type { Request } from 'express';

declare global {
  interface ERequest extends Request {
    user: UserDoc;
  }
}
