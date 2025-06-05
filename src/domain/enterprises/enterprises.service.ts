import api from '../../config/api.config';
import { EnterprisesDTO } from './enterprises.types';

export class EnterprisesService {
  private servicePrefix = import.meta.env.VITE_WEBSERVICE_ROUTE + '/enterprise';

  public async list(): Promise<any> {
    return api.get(`${this.servicePrefix}`);
  }

  public async create(data: EnterprisesDTO): Promise<any> {
    // return api.post(`${this.servicePrefix}/create`, data);

    console.log('data', data);

    return { data: { data: { enterpriseId: 2 } } };
  }
}
