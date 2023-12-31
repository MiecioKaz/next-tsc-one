export default function EditSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-3/5 mx-auto mt-40 text-gray-900">
        <h1 className="w-fit mx-auto text-center text-2xl mb-10">
          Edit the details of one of your recommended site
        </h1>
        <div>{children}</div>
      </div>
    </>
  );
}
