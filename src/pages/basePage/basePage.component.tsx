import { JSX } from 'react';
import { BasePageProps } from './basePage.types';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Path } from '@/@common/constants/paths';
import * as Icons from '../../assets/icons';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import UserSettingsDropDown from './components/userSettings.component';
import { cn } from '@/lib/utils';
import { buttonStyle, containerPage, headerPage } from './basePage.styles';

const BasePage = (props: BasePageProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={cn(containerPage.base)}>
      {props.isAuthenticated && (
        <div className="flex-1">
          <div className={cn(headerPage.base)}>
            <div className="flex items-center">
              <img src="/src/assets/workoastTextLogo.png" className="w-[150px] mr-4" />
              <div className={cn(headerPage.pageOptionsContainer)}>
                <Button variant="ghost" className={cn(buttonStyle.base)} onClick={() => navigate(Path.DASHBOARD)}>
                  Dashboard
                </Button>
                <Button variant="ghost" className={cn(buttonStyle.base)}>
                  Reuniões
                </Button>
                <Button variant="ghost" className={cn(buttonStyle.base)}>
                  Workboats
                </Button>
              </div>
            </div>

            <div className={cn(headerPage.options)}>
              <Button variant="outline" size="icon" className={cn(buttonStyle.rounded)}>
                <Icons.BellIcon />
              </Button>
              <Button variant="outline" size="icon" className={cn(buttonStyle.rounded)}>
                <Icons.SettingsIcon />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className={cn(buttonStyle.rounded)}>
                    <Icons.UserIcon />
                  </Button>
                </DropdownMenuTrigger>
                <UserSettingsDropDown />
              </DropdownMenu>
            </div>
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default BasePage;
