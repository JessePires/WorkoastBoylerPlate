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
import { InfoDialogProps } from './infoDialog.types';

const InfoDialog = (props: InfoDialogProps): JSX.Element => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-50 bg-green-600">
          <Icons.PhoneIcon color="stroke-white" />
          <span>Iniciar Chamada</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Instruções</DialogTitle>
          <DialogDescription className="p-4 flex flex-col gap-2">
            <p className="text-[16px]">- Procure um ambiente tranquilo e silencioso para a sua entrevista.</p>
            <p className="text-[16px]">- Quando o status estiver em "Gravando" fale algo para iniciar a entrevista.</p>
            <p className="text-[16px]">- Seja claro e preciso em suas repostas.</p>
            <p className="text-[16px]">- Evite pausas longas durante a sua fala.</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="flex gap-5 w-[100%] justify-center">
            <Button className="w-40 border-pantone-2765C-500 shadow-sm" variant="secondary">
              Não posso agora
            </Button>
            <Button className="w-40" onClick={props.startCall}>
              Iniciar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
