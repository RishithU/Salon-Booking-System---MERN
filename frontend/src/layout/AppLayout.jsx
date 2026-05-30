import TopBar from "../components/common/TopBar";

const AppLayout = ({ children }) => {

  return (

    <div className="min-h-screen bg-gray-100">

      <TopBar />

      <main className="p-8">
        {children}
      </main>

    </div>
  );
};

export default AppLayout;