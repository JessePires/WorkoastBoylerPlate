import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PasswordInput from '@/components/ui/passwordInput/passwordInput.component';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import * as Containers from './login.container';
import { LoginContainerArgs } from './login.types';
import { loginStyle } from './login.styles';
import { cn } from '@/lib/utils';

const Login = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Containers.LoginContainer>
      {(containerProps: LoginContainerArgs): JSX.Element => {
        return (
          <div className={cn(loginStyle.container)}>
            <img src="/src/assets/workoastLoginLogo.png" className="w-[30%]" />
            <div className={cn(loginStyle.formContainer)}>
              <div className={cn(loginStyle.formHeaderContainer)}>
                <h1 className={cn(loginStyle.formTitle)}>{t('login.welcome.label')}</h1>
                <h2 className={cn(loginStyle.formDescription)}>{t('login.welcome.description')}</h2>
              </div>

              <Form {...containerProps.form}>
                <form
                  onSubmit={containerProps.form.handleSubmit(containerProps.actions.onSubmit)}
                  className={cn(loginStyle.form)}
                >
                  <FormField
                    control={containerProps.form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-[100%]">
                        <FormLabel>{t('login.loginForm.email.title')}</FormLabel>
                        <FormControl>
                          <Input
                            className="h-10"
                            {...containerProps.form.register('email')}
                            placeholder={t('login.loginForm.email.placeholder')}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <PasswordInput {...containerProps.form.register('email')} form={containerProps.form} />
                  <Button className={cn(loginStyle.formButton)} type="submit">
                    {t('login.loginForm.enter')}
                  </Button>
                </form>
              </Form>

              <span className="text-gray-500">{t('login.serviceTerms')}</span>
            </div>
          </div>
        );
      }}
    </Containers.LoginContainer>
  );
};

export default Login;
