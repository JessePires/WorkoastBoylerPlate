import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/auth/useAuth.hook';

import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

const UserSettingsDropDown = (): JSX.Element => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>{t('basePage.userSettings.myAccount')}</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={auth.actions?.logout}>{t('basePage.userSettings.logout')}</DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default UserSettingsDropDown;
