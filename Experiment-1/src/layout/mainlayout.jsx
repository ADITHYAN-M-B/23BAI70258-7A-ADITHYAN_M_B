import Navbar from "../components/navbar";

function MainLayout({ children, setPage }) {
  return (
    <>
      <Navbar setPage={setPage} />
      <div>{children}</div>
    </>
  );
}

export default MainLayout;
