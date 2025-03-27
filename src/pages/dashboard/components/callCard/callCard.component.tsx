import { Button } from '@/components/ui/button';
import CustomCard from '@/components/ui/customCard/customCard.component';
import { JSX } from 'react';
import * as Icons from '../../../../assets/icons';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Path } from '@/@common/constants/paths';

const CallCard = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const buildCardHeader = (): JSX.Element => {
    return (
      <div className="flex justify-between">
        <h1 className="font-semibold">{`Call (Q4)`}</h1>
        <span>
          <Trans
            defaults={t('dashboard.card.priority', { priority: 1 })}
            components={{
              l: <span />,
            }}
          />
        </span>
      </div>
    );
  };

  const buildCardFooter = (): JSX.Element => {
    return (
      <div className="flex justify-center pt-2">
        <Button className="px-6" onClick={() => navigate(Path.CALL_PAGE)}>
          <span>{t('dashboard.card.startCall')}</span>
        </Button>
        {/* <Button className="px-6 border-gray-300" variant="outline">
          <span>Ver relatório</span>
        </Button> */}
      </div>
    );
  };

  return (
    <CustomCard header={buildCardHeader()} footer={buildCardFooter()} cardStyle="w-[400px] flex flex-col">
      <>
        <div className="flex items-center gap-1">
          <Icons.PhoneIcon />
          <span>Entrevista</span>
        </div>
        <div className="flex items-center gap-1 py-4">
          <span>{t('dashboard.card.status')}:</span>
          <span className="font-medium text-gray-400">Pendente</span>
        </div>
      </>
    </CustomCard>
  );
};

export default CallCard;
