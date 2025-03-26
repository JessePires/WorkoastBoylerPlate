import CustomCard from '@/components/ui/customCard/customCard.component';
import { JSX } from 'react';
import * as Icons from '../../assets/icons';
import { Button } from '@/components/ui/button';

const Dashboard = (): JSX.Element => {
  const buildCardHeader = (): JSX.Element => {
    return (
      <div className="flex justify-between">
        <h1 className="font-semibold">{`Call (Q4)`}</h1>
        <span>Prioridade 1</span>
      </div>
    );
  };

  const buildRecentWorkboatHeader = (): JSX.Element => {
    return (
      <div className="border-b-2 flex flex-col items-center pb-2">
        <h1 className="font-semibold">Call em andamento</h1>
        <Button variant="ghost">Sair</Button>
      </div>
    );
  };

  const buildCardFooter = (): JSX.Element => {
    return (
      <div className="flex justify-between pt-2">
        <Button className="px-6">
          <span>Iniciar Ligação</span>
        </Button>
        <Button className="px-6 border-gray-300" variant="outline">
          <span>Ver relatório</span>
        </Button>
      </div>
    );
  };

  return (
    <div className="w-[100%] h-screen flex flex-col bg-pantone-gray-500 p-8">
      <div className="flex justify-between pb-8">
        <div className="flex flex-col">
          <h1 className="font-extrabold text-3xl">Dashboard Q4</h1>
          <span>Gerencie suas chamadas e prioridades</span>
        </div>
        <div className="flex flex-col items-center">
          <span>10/03</span>
          <span className="font-bold">Prioridade 1</span>
        </div>
      </div>
      <div className="flex gap-8">
        <CustomCard header={buildCardHeader()} footer={buildCardFooter()} cardStyle="w-[350px] flex flex-col">
          <>
            <div className="flex items-center gap-1">
              <Icons.PhoneIcon />
              <span>Entrevista</span>
            </div>
            <div className="flex gap-1 py-4">
              <span>Status:</span>
              <span className="font-medium text-gray-400">Pendente</span>
            </div>
          </>
        </CustomCard>

        <CustomCard header={buildCardHeader()} footer={buildCardFooter()} cardStyle="w-[350px] flex flex-col">
          <>
            <div className="flex items-center gap-1">
              <Icons.PhoneIcon />
              <span>Entrevista</span>
            </div>
            <div className="flex gap-1 py-4">
              <span>Status:</span>
              <span className="font-medium text-gray-400">Pendente</span>
            </div>
          </>
        </CustomCard>

        <CustomCard header={buildCardHeader()} footer={buildCardFooter()} cardStyle="w-[350px] flex flex-col">
          <>
            <div className="flex items-center gap-1">
              <Icons.PhoneIcon />
              <span>Entrevista</span>
            </div>
            <div className="flex gap-1 py-4">
              <span>Status:</span>
              <span className="font-medium text-gray-400">Pendente</span>
            </div>
          </>
        </CustomCard>
      </div>
      <div className="flex flex-col items-center p-16">
        <h1 className="text-3xl font-extrabold">Workboats Recentes</h1>

        <div className="pt-8">
          <CustomCard header={buildRecentWorkboatHeader()} cardStyle="w-[45%] flex flex-col">
            <>
              <div className="flex flex-col gap-3 pt-2">
                <div className="w-[100%] flex justify-between">
                  <span className="text-gray-500">Seu nome</span>
                  <span>João Silva</span>
                </div>
                <div className="w-[100%] flex justify-between">
                  <span className="text-gray-500">Telefone</span>
                  <span>{'(11) 9 8764-4321'}</span>
                </div>
                <div className="w-[100%] flex justify-between">
                  <span className="text-gray-500">Duração</span>
                  <span>{'00:15:32'}</span>
                </div>
              </div>
              <div className="flex flex-col items-center pt-8 gap-2">
                <span className="text-gray-500">Transcrição</span>
                <span className="text-justify bg-pantone-gray-500 p-4 rounded-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat
                </span>
              </div>
            </>
          </CustomCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
