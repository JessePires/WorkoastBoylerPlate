import { LoginSchema } from '@/joi/login.schema';
import { AuthenticationService } from './authentication.service';

export class AuthenticationController {
  private service = new AuthenticationService();

  public async authenticate(data: { email: string; password: string }): Promise<any> {
    return this.service.authenticate(data);
  }
}
