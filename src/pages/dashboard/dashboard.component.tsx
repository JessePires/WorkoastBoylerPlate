import CustomCard from '@/components/ui/customCard/customCard.component';
import { JSX } from 'react';

const Dashboard = (): JSX.Element => {
  const buildCardHeader = (): JSX.Element => {
    return <></>;
  };

  const buildCardBody = (): JSX.Element => {
    return <></>;
  };

  const buildCardFooter = (): JSX.Element => {
    return <></>;
  };

  return (
    <div className="w-[100%] h-screen flex flex-col bg-pantone-gray-500 p-8">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="font-extrabold text-3xl">Dashboard Q4</h1>
          <span>Gerencie suas chamadas e prioridades</span>
        </div>
        <div className="flex flex-col items-center">
          <span>10/03</span>
          <span className="font-bold">Prioridade 1</span>
        </div>
      </div>
      <div className="flex">
        <CustomCard header={buildCardHeader()} body={buildCardBody()} footer={buildCardFooter()} />
      </div>
    </div>
  );
};

export default Dashboard;
