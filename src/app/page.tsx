import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CapabilityExplorer } from "@/components/home/CapabilityExplorer";
import { Industries } from "@/components/home/Industries";
import { LaunchPackage } from "@/components/home/LaunchPackage";
import { BeyondLab } from "@/components/home/BeyondLab";
import { Navigator } from "@/components/navigator/Navigator";
import { InsightsTeaser } from "@/components/home/InsightsTeaser";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <CapabilityExplorer />
      <Industries />
      <LaunchPackage compact />
      <BeyondLab />
      <Navigator />
      <InsightsTeaser />
    </>
  );
}
