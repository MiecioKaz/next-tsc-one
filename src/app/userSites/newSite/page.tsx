import data from "@/app/json/italy.json";
import NewSiteForm from "@/app/components/newSiteForm";

const NewSitePage = () => {
  const regions = data;
  return (
    <section>
      <NewSiteForm regions={regions} />
    </section>
  );
};
export default NewSitePage;
