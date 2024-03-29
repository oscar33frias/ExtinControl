import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto mt-5 md:md-20 p-5 md:flex md:justify-center">
        <div >
          <Outlet></Outlet>
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
