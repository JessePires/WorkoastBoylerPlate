import { AuthenticationService } from './authentication.service';

export class AuthenticationController {
  private service = new AuthenticationService();

  public async authenticate(data: { email: string; password: string }): Promise<any> {
    const response = await this.service.authenticate(data);

    return response;
  }
}
