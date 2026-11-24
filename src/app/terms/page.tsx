import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata = pageMeta({ title: "Terms of Use", description: "Terms for using the Umami Labs website.", path: "/terms" });

export default function Terms() {
  return (
    <LegalPage
      title="Terms of use"
      sections={[
        { h: "Information, not advice", p: "Content on this website — including insights articles and the Food Venture Navigator — is general information. It is not regulatory, legal, financial or technical advice for your specific situation, and it does not create a client relationship." },
        { h: "No guarantees", p: "Regulatory approvals and licences are granted by the relevant authorities. Nothing on this website guarantees an approval, a timeline or a commercial outcome." },
        { h: "Intellectual property", p: "Text, design and code on this website belong to Umami Labs unless otherwise stated. Photography is used under the Unsplash License." },
        { h: "Engagements", p: "Projects are governed by a separate written agreement that sets out scope, deliverables, fees and responsibilities. [Business to review these terms with legal counsel before publishing.]" },
      ]}
    />
  );
}
