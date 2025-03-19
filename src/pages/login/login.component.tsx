import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PasswordInput from '@/components/ui/passwordInput/passwordInput.component';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import * as Containers from './login.container';
import { LoginContainerArgs } from './login.types';

const Login = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Containers.LoginContainer>
      {(containerProps: LoginContainerArgs): JSX.Element => {
        return (
          <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100">
            <div className="bg-white rounded-xl w-1/3 flex flex-col items-center pb-10 shadow-xl">
              <div className="items-center flex flex-col w-[100%] bg-pantone-2191C-500 rounded-t-xl p-10">
                <h1 className="text-white text-3xl font-medium mb-6">{t('login.welcome.label')}</h1>
                <h2 className="text-gray-100 text-sm">{t('login.welcome.description')}</h2>
              </div>

              <Form {...containerProps.form}>
                <form
                  onSubmit={containerProps.form.handleSubmit(containerProps.actions.onSubmit)}
                  className="space-y-8 pt-12 flex flex-col items-center pl-8 pr-8 pb-8 w-[100%]"
                >
                  <FormField
                    control={containerProps.form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="w-[100%]">
                        <FormLabel>{t('login.loginForm.email.title')}</FormLabel>
                        <FormControl>
                          <Input className="h-10" placeholder={t('login.loginForm.email.placeholder')} {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <PasswordInput form={containerProps.form} />
                  <Button className="bg-pantone-2191C-500 w-[100%] h-12" type="submit">
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
