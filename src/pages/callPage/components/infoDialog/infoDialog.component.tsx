import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import * as Icons from '../../../../assets/icons';

import { JSX } from 'react';
import { InfoDialogContainerArgs, InfoDialogProps } from './infoDialog.types';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { Checkbox } from '@/components/ui/checkbox';
import * as Containers from './infoDialog.container';

const InfoDialog = (props: InfoDialogProps): JSX.Element => {
  return (
    <Containers.CallPageContainer>
      {(containerProps: InfoDialogContainerArgs): JSX.Element => {
        return (
          <Dialog>
            <DialogTrigger>
              <Button className="w-50 bg-green-600">
                <Icons.PhoneIcon color="stroke-white" />
                <span>{t('callPage.callCard.startCall')}</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl">{t('callPage.callCard.instructions.title')}</DialogTitle>
                <DialogDescription className="p-4 flex flex-col gap-2">
                  <Trans
                    defaults={t('callPage.callCard.instructions.description')}
                    components={{
                      p: <p className="text-[16px]" />,
                    }}
                  />
                  <div
                    className="flex gap-2 items-center mt-4 w-fit"
                    onClick={() => containerProps.actions.setAcceptRecording((prevState) => !prevState)}
                  >
                    <Checkbox className="size-5 border-pantone-2745C-500" checked={containerProps.acceptRecording} />
                    <label className="text-[16px] text-pantone-2765C-500">
                      {t('callPage.callCard.allowRecording')}
                    </label>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose className="flex gap-5 w-[100%] justify-center">
                  <Button className="w-40 border-pantone-2765C-500 shadow-sm" variant="secondary">
                    {t('callPage.callCard.cannotDoItNow')}
                  </Button>
                  <Button className="w-40" onClick={props.startCall} disabled={!containerProps.acceptRecording}>
                    {t('callPage.callCard.start')}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      }}
    </Containers.CallPageContainer>
  );
};

export default InfoDialog;
