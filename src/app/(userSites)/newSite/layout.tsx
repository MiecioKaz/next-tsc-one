export default function NewSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <div className="fixed top-0 w-full z-10 h-20 bg-orange-200"></div> */}
      <div className="w-3/5 mx-auto mt-40 text-gray-900">
        <h1 className="w-fit mx-auto text-center text-2xl mb-10">
          Register the details of your recommended site
        </h1>
        <div>{children}</div>
      </div>
    </>
  );
}
