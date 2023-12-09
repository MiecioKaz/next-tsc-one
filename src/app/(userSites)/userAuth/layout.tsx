import { Toaster } from "react-hot-toast";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* <div className="fixed top-0 w-full z-10 h-20 bg-orange-200"></div> */}
      <Toaster position="top-center" />
      {children}
    </section>
  );
}
