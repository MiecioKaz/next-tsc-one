import data from "@/json/italy.json";
import NewSiteForm from "@/components/newSiteForm";

const NewSitePage = () => {
  const regions: Record<string, string[]> = data;
  return (
    <section>
      <NewSiteForm regions={regions!} />
    </section>
  );
};
export default NewSitePage;
