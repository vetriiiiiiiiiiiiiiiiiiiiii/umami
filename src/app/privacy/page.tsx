import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata = pageMeta({ title: "Privacy Notice", description: "How The Umami Labs handles personal information submitted through this website.", path: "/privacy" });

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy notice"
      sections={[
        { h: "What we collect", p: "When you submit an enquiry we receive the details you provide: your name, email address, and optionally your phone number, company and project information. If you use the Food Venture Navigator, your answers stay in your browser unless you choose to attach them to an enquiry." },
        { h: "How we use it", p: "We use your details only to respond to your enquiry and to discuss a potential project with you. We do not sell your personal information." },
        { h: "Storage & processors", p: "Enquiries are delivered to The Umami Labs through a configured service provider (for example an email or form-handling service). [Business to confirm the provider, storage location and retention period before publishing.]" },
        { h: "Browser storage", p: "This site stores your colour theme preference in your browser’s local storage and a session flag so the loading sequence plays only once per visit. No advertising cookies are set by the website itself." },
        { h: "Your choices", p: "You can ask us to access, correct or delete the information you have sent us by replying to any email from us. [Business to add a contact method and any jurisdiction-specific rights before publishing.]" },
      ]}
    />
  );
}
