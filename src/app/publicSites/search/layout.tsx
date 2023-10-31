export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed top-0 w-full z-10 h-20 bg-orange-200"></div>

      <section>{children}</section>
    </>
  );
}
