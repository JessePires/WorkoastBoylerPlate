import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { JSX } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const Login = (): JSX.Element => {
  const { t } = useTranslation();

  const form = useForm();

  const onSubmit = () => console.log('submit');

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100">
      <div className="bg-white rounded-xl w-1/3">
        <div className="items-center flex flex-col bg-pantone-2191C-500 rounded-t-xl p-10 ">
          <h1 className="text-white text-3xl font-medium mb-6">{t('login.welcome.label')}</h1>
          <h2 className="text-gray-100 text-sm">{t('login.welcome.description')}</h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pt-12 flex flex-col items-center pl-8 pr-8 pb-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-[100%]">
                  <FormLabel>{t('login.loginForm.email.title')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('login.loginForm.email.placeholder')} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-[100%]">
                  <FormLabel>{t('login.loginForm.password')}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="bg-pantone-2191C-500 w-[100%] h-12" type="submit">
              {t('login.loginForm.enter')}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
