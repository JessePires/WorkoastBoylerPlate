import api from '../../config/api.config';

export class AuthenticationService {
  private servicePrefix = import.meta.env.VITE_WEBSERVICE_ROUTE + '/auth';

  public async authenticate(data: { email: string; password: string }): Promise<any> {
    const response = await api.post(`${this.servicePrefix}/login`, data);

    console.log('response', response);

    return response;
  }
}
