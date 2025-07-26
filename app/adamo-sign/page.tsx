import { AdamoSignHero } from "./components/AdamoSignHero";
import { ToolsBanner } from "./components/ToolsBanner";

export default function Page() {
  return (
    <>
      <AdamoSignHero />
      <ToolsBanner className="pt-20 md:pt-16 lg:pt-24" />
    </>
  );
}
