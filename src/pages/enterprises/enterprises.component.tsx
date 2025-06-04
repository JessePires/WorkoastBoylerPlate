import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/dataTable/dataTable.component';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { JSX } from 'react';

type Enterprise = {
  id_enterprise: number;
  name: string;
  description: string;
};

export const payments: Enterprise[] = [
  {
    id_enterprise: 1,
    name: 'Workoast',
    description: 'Workoast',
  },
  {
    id_enterprise: 2,
    name: 'Coamo',
    description: 'Coamo Agroindustrial',
  },
];

const columns: ColumnDef<Enterprise>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ações</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Editar</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const EnterprisesPage = (): JSX.Element => {
  return (
    <div className="flex-col bg-pantone-gray-500 p-8">
      <div className="flex justify-between pb-8">
        <h1 className="font-extrabold text-3xl">Empresas</h1>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-pantone-2191C-500">Criar nova Empresa</Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-2/4 p-4">
            <SheetHeader>
              <SheetTitle>Cadastrar Empresa</SheetTitle>
              <SheetDescription>Adicione aqui as informações da sua empresa</SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-name">Nome</Label>
                <Input id="sheet-demo-name" placeholder="Nome aqui..." />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-username">Descrição</Label>
                <Textarea id="sheet-demo-username" cols={30} className="h-66" placeholder="Descreva sua empresa..." />
              </div>
            </div>
            <SheetFooter className="flex flex-row justify-between">
              <SheetClose asChild>
                <Button variant="outline" className="w-[48%]">
                  Cancelar
                </Button>
              </SheetClose>
              <Button type="submit" className="w-[48%]">
                Cadastrar
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <DataTable columns={columns} data={payments} />
    </div>
  );
};

export default EnterprisesPage;
