import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/dataTable/dataTable.component';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { JSX } from 'react';

import * as Containers from './enterprises.container';
import { EnterprisesContainerArgs } from './enterprises.types';
import { enterpriseColumns } from './enterprises.columns';

const EnterprisesPage = (): JSX.Element => {
  return (
    <Containers.EnterprisesContainer>
      {(containerProps: EnterprisesContainerArgs): JSX.Element => {
        return (
          <div className="flex-col bg-pantone-gray-500 p-8">
            <div className="flex justify-between pb-8">
              <h1 className="font-extrabold text-3xl">Empresas</h1>

              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-pantone-2191C-500">Criar nova Empresa</Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-2/4 p-4">
                  <Form {...containerProps.form}>
                    <form onSubmit={containerProps.form.handleSubmit(containerProps.actions.onCreateEnterprise)}>
                      <SheetHeader>
                        <SheetTitle>Cadastrar Empresa</SheetTitle>
                        <SheetDescription>Adicione aqui as informações da sua empresa</SheetDescription>
                      </SheetHeader>
                      <div className="grid flex-1 auto-rows-min gap-6 px-4">
                        <FormField
                          control={containerProps.form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="w-[100%]">
                              <FormLabel>Nome</FormLabel>
                              <FormControl>
                                <Input className="h-10" placeholder="nome aqui..." {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={containerProps.form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem className="w-[100%]">
                              <FormLabel>Descrição</FormLabel>
                              <FormControl>
                                <Textarea cols={30} className="h-66" placeholder="Descreva sua empresa..." {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <SheetFooter className="flex flex-row justify-between">
                        <SheetClose asChild>
                          <Button variant="outline" className="w-[48%]" onClick={containerProps.actions.clearForm}>
                            Cancelar
                          </Button>
                        </SheetClose>
                        <Button className="w-[48%] bg-pantone-2191C-500" type="submit">
                          Cadastrar
                        </Button>
                      </SheetFooter>
                    </form>
                  </Form>
                </SheetContent>
              </Sheet>
            </div>

            <DataTable columns={enterpriseColumns} data={containerProps.dataSource} />
          </div>
        );
      }}
    </Containers.EnterprisesContainer>
  );
};

export default EnterprisesPage;
