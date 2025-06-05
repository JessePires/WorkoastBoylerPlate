import { JobsService } from './enterprises.service';
import { JobsDTO } from './enterprises.types';

export class JobsController {
  private service = new JobsService();

  public async list(): Promise<any> {
    return this.service.list();
  }

  public async create(data: JobsDTO): Promise<any> {
    return this.service.create(data);
  }
}
