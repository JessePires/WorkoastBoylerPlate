import Joi from 'joi';
import { GenericSchema } from './generic.schema';

export class EnterpriseSchema extends GenericSchema {
  public static readonly enterprise = Joi.object({
    name: Joi.string().required().empty([null, '']).messages({
      'any.required': 'Nome obrigatório',
    }),
    description: Joi.string().required().empty([null, '']).messages({
      'any.required': 'Descrição obrigatória',
    }),
  });
}
