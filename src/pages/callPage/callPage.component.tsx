import CustomCard from '@/components/ui/customCard/customCard.component';
import Divider from '@/components/ui/divider/divider';
import { JSX } from 'react';
import * as Containers from './callPage.container';
import { CallPageContainerArgs } from './callPage.types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { t } from 'i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const CallPage = (): JSX.Element => {
  return (
    <Containers.CallPageContainer>
      {(containerProps: CallPageContainerArgs): JSX.Element => {
        return (
          <div className="flex flex-col w-[100%] items-center pt-10">
            <h1 className="font-extrabold text-3xl pb-1">{`Workboat - Call (Q4)`}</h1>
            <h2 className="text-gray-500">{`Gerencie sua ligação`}</h2>

            <div className="flex gap-8 pt-8 w-[100%] justify-center">
              <CustomCard cardStyle="w-[35%]" header={<h1 className="font-[550] text-center text-l">Prompt</h1>}>
                <div className="w-[100%]">
                  <Divider />
                  <Form {...containerProps.form}>
                    <form
                      onSubmit={containerProps.form.handleSubmit(containerProps.actions.onSubmit)}
                      className="flex flex-col gap-5 pt-8"
                    >
                      <FormField
                        control={containerProps.form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="w-[100%] flex flex-col items-center">
                            <FormLabel className="text-gray-500">{`seu nome`}</FormLabel>
                            <FormControl>
                              <Input className="h-10 w-[]" {...containerProps.form.register('name')} {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={containerProps.form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="w-[100%] flex flex-col items-center">
                            <FormLabel className="text-gray-500">{`Telefone`}</FormLabel>
                            <FormControl>
                              <Input className="h-10" {...containerProps.form.register('phone')} {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={containerProps.form.control}
                        name="prompt"
                        render={({ field }) => (
                          <FormItem className="w-[100%] flex flex-col items-center">
                            <FormLabel className="text-gray-500">{'Prompt'}</FormLabel>
                            <FormControl>
                              <Textarea className="h-10" {...containerProps.form.register('prompt')} {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="w-[100%] flex justify-between">
                        <Button variant="outline">{'Cancelar'}</Button>

                        <Button type="submit" className="bg-green-500">
                          {'Iniciar Ligação'}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </CustomCard>

              <CustomCard cardStyle="w-[35%]" header={<h1 className="font-[550] text-center text-l">Transcrição</h1>}>
                <div>
                  <Divider />

                  <Form {...containerProps.form}>
                    <form
                      onSubmit={containerProps.form.handleSubmit(containerProps.actions.onSubmit)}
                      className="flex flex-col gap-5 pt-8"
                    >
                      <FormField
                        control={containerProps.form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="w-[100%] flex flex-col items-center">
                            <FormLabel className="text-gray-500">{t('login.loginForm.email.title')}</FormLabel>
                            <FormControl>
                              <Textarea
                                className="h-30"
                                {...containerProps.form.register('email')}
                                {...field}
                                rows={15}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end">
                        <Button className="bg-green-500">Finalizar Ligação</Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </CustomCard>
            </div>
          </div>
        );
      }}
    </Containers.CallPageContainer>
  );
};

export default CallPage;
