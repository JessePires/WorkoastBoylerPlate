import { Button } from '@/components/ui/button';
import CustomCard from '@/components/ui/customCard/customCard.component';
import { JSX } from 'react';
import * as Icons from '../../../../assets/icons';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Path } from '@/@common/constants/paths';
import { cardHeaderStyle, cardStyle, footerStyle } from './callCard.styles';
import { cn } from '@/lib/utils';

const CallCard = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const buildCardHeader = (): JSX.Element => {
    return (
      <div className={cn(cardHeaderStyle.container)}>
        <h1 className={cn(cardHeaderStyle.title)}>{`Call (Q4)`}</h1>
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
      <div className={cn(footerStyle.container)}>
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
        <div className={cn(cardStyle.header)}>
          <Icons.PhoneIcon />
          <span>Entrevista</span>
        </div>
        <div className={cn(cardStyle.info)}>
          <span>{t('dashboard.card.status')}:</span>
          <span className={cn(cardStyle.status)}>Pendente</span>
        </div>
      </>
    </CustomCard>
  );
};

export default CallCard;
