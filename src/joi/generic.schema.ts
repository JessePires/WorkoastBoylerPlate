import tlds from 'tlds';
import Joi from 'joi';

export class GenericSchema {
  static email = Joi.string().email({ tlds: { allow: tlds } });
  static password = Joi.string().regex(
    /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!@#$%^&*(){}[\]"'\\|<,>./?`~_\-+]*[!@#$%^&*(){}[\]"'\\|<,>./?`~_\-+]).{8,}$/,
  );
  static text = Joi.string().regex(/^[–\-0-9A-Za-zà-úÀ-ÚÄ-Üü\s,.:*+!?@³²$#%&(){}ªº°=_¨[\]<>|;'"“”©®™¢€£¥¶]+$/);
}
