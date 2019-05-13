import { tagsApiUrl } from './routes';
import * as api from './api';

export const getAll = () =>
    api.get(tagsApiUrl)
