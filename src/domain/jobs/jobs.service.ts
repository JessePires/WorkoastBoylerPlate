import api from '../../config/api.config';
import { JobsDTO } from './jobs.types';

export class JobsService {
  private servicePrefix = import.meta.env.VITE_WEBSERVICE_ROUTE + '/jobs';

  public async list(): Promise<any> {
    return api.get(`${this.servicePrefix}`);
  }

  public async create(data: JobsDTO): Promise<any> {
    return api.post(`${this.servicePrefix}`, data);
  }
}
