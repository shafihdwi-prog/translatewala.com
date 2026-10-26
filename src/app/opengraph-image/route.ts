import OpenGraphImage from "@/components/open-graph";

export const dynamic = "force-static";
export function GET() {
  return OpenGraphImage();
}
