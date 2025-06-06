import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/dataTable/dataTable.component';
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

import { Check, ChevronsUpDown } from 'lucide-react';
import { JSX } from 'react';
import * as Containers from './jobs.container';
import { JobsContainerArgs } from './jobs.types';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { jobColumns } from './jobs.columns';

const JobsPage = (): JSX.Element => {
  return (
    <Containers.JobsContainer>
      {(containerProps: JobsContainerArgs): JSX.Element => {
        return (
          <div className="flex-col bg-pantone-gray-500 p-8">
            <div className="flex justify-between pb-8">
              <h1 className="font-extrabold text-3xl">Vagas</h1>

              <Sheet open={containerProps.isSheetOpen}>
                <SheetTrigger asChild>
                  <Button className="bg-pantone-2191C-500" onClick={() => containerProps.actions.setIsSheetOpen(true)}>
                    Criar nova Vaga
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-2/4 p-4">
                  <Form {...containerProps.form}>
                    <form onSubmit={containerProps.form.handleSubmit(containerProps.actions.onCreateJob)}>
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
                          name="id_enterprise"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Empresa</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        'justify-between h-10',
                                        !field.value && 'text-muted-foreground',
                                        'text-sm',
                                      )}
                                    >
                                      {field.value
                                        ? containerProps.enterprises.find((enterprise) => enterprise.id === field.value)
                                            ?.name
                                        : 'Selecione a empresa'}
                                      <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[100%] p-0">
                                  <Command>
                                    <CommandInput placeholder="Search framework..." className="h-9" />
                                    <CommandList>
                                      <CommandEmpty className="flex w-[80%] py-5 text-center justify-self-center">
                                        <span className="text-sm text-gray-400">Nenhuma empresa encontrada</span>
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {containerProps.enterprises.map((enterprise) => (
                                          <CommandItem
                                            value={`${enterprise.id}`}
                                            key={enterprise.name}
                                            onSelect={() => {
                                              containerProps.form.setValue('id_enterprise', enterprise.id);
                                            }}
                                          >
                                            {enterprise.name}
                                            <Check
                                              className={cn(
                                                'ml-auto',
                                                enterprise.id === field.value ? 'opacity-100' : 'opacity-0',
                                              )}
                                            />
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>

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

            <DataTable columns={jobColumns} data={containerProps.dataSource} />
          </div>
        );
      }}
    </Containers.JobsContainer>
  );
};

export default JobsPage;
