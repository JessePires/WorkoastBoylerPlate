import { EnterpriseSchema } from '@/joi/enterprises.schema';
import { EnterprisesService } from './enterprises.service';
import { EnterprisesDTO } from './enterprises.types';

export class EnterprisesController {
  private service = new EnterprisesService();

  public async list(): Promise<any> {
    return this.service.list();
  }

  public async create(data: EnterprisesDTO): Promise<any> {
    await EnterpriseSchema.enterprise.validateAsync(data, { abortEarly: false });

    return this.service.create(data);
  }
}
