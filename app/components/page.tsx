import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="container">
      <h1 className="heading-1 ">Page</h1>

      <div className="space-y-8 bg-neutral-500 p-10">
        <Button>Send</Button>
        <Button variant={"secondary"}>Secondary</Button>
        <Button variant={"link"}>Link</Button>
        <Button variant={"link"}>Link</Button>
      </div>
    </div>
  );
}
