import { commentUrl } from './routes';
import * as api from './api';

export const create = (id, params) =>
    api.post(commentUrl(id), { ...params })
