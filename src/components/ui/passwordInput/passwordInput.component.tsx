import { JSX } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../form';
import { useTranslation } from 'react-i18next';
import { Input } from '../input';
import { PasswordInputContainerArgs, PasswordInputProps } from './passwordInput.types';

import * as Containers from './passwordInput.container';
import * as Icons from '../../../assets/icons';

const PasswordInput = (props: PasswordInputProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Containers.PasswordInputContainer>
      {(containerProps: PasswordInputContainerArgs): JSX.Element => {
        return (
          <FormField
            control={props.form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-[100%]">
                <FormLabel className="flex justify-between">
                  <span>{t('login.loginForm.password')}</span>
                  <a className="font-normal text-blue-900" href="">
                    {t('login.loginForm.forgotPassword')}
                  </a>
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-10"
                    type={containerProps.showPassword ? 'text' : 'password'}
                    {...field}
                    lefticon={<Icons.LockClosedIcon />}
                    righticon={
                      <div onClick={containerProps.actions.toggleShowPassword}>
                        {containerProps.showPassword ? <Icons.EyeClosedIcon /> : <Icons.EyeOpenedIcon />}
                      </div>
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        );
      }}
    </Containers.PasswordInputContainer>
  );
};

export default PasswordInput;
