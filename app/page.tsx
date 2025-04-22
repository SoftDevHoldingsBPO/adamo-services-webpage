import { HamburgerMenuIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container">
      <Button>
        <HamburgerMenuIcon />
      </Button>
      <h1 className="heading-1">
        Automatización y optimización sin complicaciones
      </h1>
      <h2 className="heading-2">Lorem ipsum dolor sit amet.</h2>
    </div>
  );
}
