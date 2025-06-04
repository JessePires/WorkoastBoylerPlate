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

type Job = {
  id_job: number;
  name: string;
  company: string;
  description: string;
};

export const payments: Job[] = [
  {
    id_job: 1,
    name: 'Senior Software Engineer',
    company: 'Workoast',
    description: 'Senior Software Engineer',
  },
  {
    id_job: 1,
    name: 'Cientista de Dados',
    company: 'Coamo',
    description: 'Cientista de Dados na COAMO',
  },
];

const columns: ColumnDef<Job>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'company',
    header: 'Empresa',
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

const JobsPage = (): JSX.Element => {
  return (
    <div className="flex-col bg-pantone-gray-500 p-8">
      <div className="flex justify-between pb-8">
        <h1 className="font-extrabold text-3xl">Vagas</h1>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-pantone-2191C-500">Criar nova Vaga</Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-2/4 p-4">
            <SheetHeader>
              <SheetTitle>Criar nova Vaga</SheetTitle>
              <SheetDescription>Adicione aqui as informações da vaga</SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-name">Nome</Label>
                <Input id="sheet-demo-name" placeholder="Nome aqui..." />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-username">Descrição</Label>
                <Textarea id="sheet-demo-username" className="h-66" placeholder="Descreva a vaga..." />
              </div>
            </div>
            <SheetFooter className="flex flex-row justify-between">
              <SheetClose asChild>
                <Button variant="outline" className="w-[48%]">
                  Cancelar
                </Button>
              </SheetClose>
              <Button type="submit" className="w-[48%]">
                Criar
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <DataTable columns={columns} data={payments} />
    </div>
  );
};

export default JobsPage;
