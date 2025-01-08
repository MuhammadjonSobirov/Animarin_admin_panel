import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image Div */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/24a3bc7f939ba49ecc054061dccbac61.jpg)", 
          backgroundAttachment: 'fixed', // Bu rasmni sahifaga yopishtirishga yordam beradi
          backgroundPosition: 'center',  // Rasmni markazlashtirish
          backgroundSize: 'cover', // Rasmni to'liq qoplash
        }}
      ></div>
      <div className="relative z-10 flex flex-col w-full min-h-screen dark:bg-black dark:bg-opacity-50">
        <Header />
        <div className="flex-grow pt-10 px-20 sm:px-28 text-center overflow-y-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
