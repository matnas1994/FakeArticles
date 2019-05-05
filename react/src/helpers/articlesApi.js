import { articleApiUrl } from './routes';
import * as api from './api';

export const getAll = () =>
    api.get(articleApiUrl())

export const get = id =>
    api.get(articleApiUrl(id))

export const create = params =>
    api.post(articleApiUrl(), { ...params })

export const destroy = id =>
    api.destroy(articleApiUrl(id))

export const update = (id, params) =>
    api.put(articleApiUrl(id), { ...params })