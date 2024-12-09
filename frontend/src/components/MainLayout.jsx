import Leftsidebar from './Leftsidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex">
      <Leftsidebar />
      <div className="flex-grow">
        {/* This renders child routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
