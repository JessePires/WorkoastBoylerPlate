export class AuthenticationService {
  public async authenticate(data: { email: string; password: string }): Promise<any> {
    return data;
  }
}
