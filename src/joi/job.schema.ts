import Joi from 'joi';
import { GenericSchema } from './generic.schema';

export class JobSchema extends GenericSchema {
  public static readonly job = Joi.object({
    name: Joi.string().required().empty([null, '']).messages({
      'any.required': 'Nome obrigatório',
    }),
    enterprise: Joi.number().required().empty([null, '']).messages({
      'any.required': 'Selecione uma empresa',
    }),
    description: Joi.string().required().empty([null, '']).messages({
      'any.required': 'Descrição obrigatória',
    }),
  });
}
