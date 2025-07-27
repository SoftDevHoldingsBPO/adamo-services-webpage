import VideoPlayer from "@/components/VideoPlayer";

import { AdamoSignHero } from "./components/AdamoSignHero";
import { FirmaLevels } from "./components/FirmaLevels";
import { ToolsBanner } from "./components/ToolsBanner";

export default function Page() {
  return (
    <>
      <AdamoSignHero />
      <ToolsBanner className="pt-20 md:pt-16 lg:pt-24" />
      <VideoPlayer
        srcES="/video/AdamoId-ES.mp4"
        srcEN="/video/AdamoId-EN.mp4"
        className="mt-[112px] lg:mt-[130px] hidden md:block"
      />
      <FirmaLevels />
    </>
  );
}
