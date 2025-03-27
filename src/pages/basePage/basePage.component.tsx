import { JSX } from 'react';
import { BasePageProps } from './basePage.types';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Path } from '@/@common/constants/paths';
import * as Icons from '../../assets/icons';

const BasePage = (props: BasePageProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="w-[100%] h-screen bg-pantone-gray-500">
      {props.isAuthenticated && (
        <div className="flex-1">
          <div className="bg-white h-18 flex items-center border-b-2 justify-between pl-2 pr-4">
            <div className="flex items-center">
              <img src="/src/assets/workoastTextLogo.png" className="w-[150px] mr-4" />
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  className="hover:bg-white hover:text-pantone-2191C-500 p-0"
                  onClick={() => navigate(Path.DASHBOARD)}
                >
                  Dashboard
                </Button>
                <Button variant="ghost" className="hover:bg-white hover:text-pantone-2191C-500 p-0">
                  Reuniões
                </Button>
                <Button variant="ghost" className="hover:bg-white hover:text-pantone-2191C-500 p-0">
                  Workboats
                </Button>
              </div>
            </div>

            <div className="flex flex-row items-center gap-4">
              <Button variant="outline" size="icon" className="rounded-3xl">
                <Icons.BellIcon />
              </Button>
              <Button variant="outline" size="icon" className="rounded-3xl">
                <Icons.SettingsIcon />
              </Button>
              <Button variant="outline" size="icon" className="rounded-3xl">
                <Icons.UserIcon />
              </Button>
            </div>
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default BasePage;
