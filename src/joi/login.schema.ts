import Joi from 'joi';
import { GenericSchema } from './generic.schema';
import { t } from 'i18next';

export class LoginSchema extends GenericSchema {
  public static readonly login = Joi.object({
    email: this.email.required().empty([null, '']).messages({
      'any.required': 'login.errors.emptyEmail',
      'string.email': 'login.errors.invalidEmail',
    }),
    password: this.text.required().empty([null, '']).messages({ 'any.required': 'login.errors.emptyPassword' }),
  });
}
