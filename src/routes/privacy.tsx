import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import appleLogo from "@/assets/companion-apple.png";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Companion Education-Coach Edition™" },
      {
        name: "description",
        content:
          "Companion Education™ privacy policy: local-first educator tools designed to minimize sensitive information. No cloud database of classroom content.",
      },
      { property: "og:title", content: "Privacy Policy — Companion Education-Coach Edition™" },
      {
        property: "og:description",
        content:
          "Companion Education™ privacy policy: local-first educator tools designed to minimize sensitive information.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  {
    title: "1. Our Privacy Approach",
    body: "Companion Education follows a privacy-by-design and data-minimization approach. Our applications are intended to support educator productivity, planning, organization, communication, and instructional workflows. They are not intended to serve as repositories for official student records, personally identifiable student information, confidential personnel information, medical information, or other sensitive records. Users must not enter or speak personally identifiable information about students, families, staff members, or other individuals into Companion Education applications.",
  },
  {
    title: "2. Personally Identifiable Student Information",
    body: "Companion Education applications are not designed for the storage of personally identifiable student information. Users must not enter, upload, record, or speak information such as: full student names, student identification numbers, birth dates, home addresses, personal email addresses, phone numbers, medical or health information, disability information, Individualized Education Program (IEP) information, 504 Plan information, disciplinary records, individually identifiable grades or assessment information, confidential educational records, or any other information that could reasonably identify a particular student. When users need to distinguish between students, Companion Education recommends using initials, non-identifying nicknames, general descriptions, or teacher-created reference numbers that are not official school or district identification numbers.",
  },
  {
    title: "3. User-Created App Information",
    body: "Companion Education applications may allow users to create notes, reminders, instructional information, student-reference information, task lists, planning information, or other organizational content. For applications designed with local storage, this information is stored through the user’s device or browser rather than in a Companion Education cloud database. Companion Education does not maintain a centralized cloud database containing users’ classroom notes, student tracking information, instructional notes, reminders, or similar user-created app content. Information may remain on the user’s device until it is deleted by the user, removed through browser or device settings, or otherwise cleared according to the operation of the user’s device or browser. Users are responsible for securing their devices and appropriately managing information stored locally.",
  },
  {
    title: "4. Exported or Downloaded Information",
    body: "Certain Companion Education applications may allow users to export, download, copy, print, or otherwise transfer information they have created. Once information is exported or downloaded, the user is responsible for securely storing, transmitting, sharing, deleting, or otherwise managing that information. Users must continue to avoid including personally identifiable student information or other sensitive information in exported content.",
  },
  {
    title: "5. Voice Processing",
    body: "Some Companion Education applications may include optional voice-enabled features. When a user chooses to use a voice feature, voice input or information derived from that input is transmitted to Google Gemini for processing. Information submitted for voice processing may be retained temporarily by the service provider as part of providing, securing, monitoring, and operating the service. Companion Education uses a paid Google Gemini API configuration under which prompts and responses submitted through the API are not used by Google to train or improve its artificial intelligence models. Companion Education does not maintain a cloud database containing users’ voice recordings or voice-command history. Users must not speak personally identifiable student information, confidential educational records, medical information, or other sensitive personal information into voice-enabled features. When referring to students through voice features, users should use initials, non-identifying nicknames, general descriptions, or teacher-created reference numbers that are not official student identification numbers.",
  },
  {
    title: "6. Device and Technical Information",
    body: "Companion Education does not maintain a cloud database for the purpose of building individual device profiles or tracking users’ classroom activity across devices. However, Companion Education applications rely on internet infrastructure and third-party technology providers. Those providers may automatically process limited technical information necessary to operate, secure, diagnose, and deliver their services. This information may include: Internet Protocol (IP) addresses, browser type, operating system, device type, request timestamps, error information, diagnostic information, security-related logs, and network or connection information. This limited technical processing is different from Companion Education storing users’ classroom content or maintaining a cloud database of teacher-created information. Technical information processed by third-party providers may be subject to those providers’ privacy, security, and retention practices.",
  },
  {
    title: "7. Local Storage of Classroom Content",
    body: "For applications specifically designed to use local device or browser storage, Companion Education does not maintain a centralized cloud database containing user-created classroom content. This may include: classroom notes, teacher reminders, student-reference notes, instructional planning information, student tracking information, task lists, daily priorities, and organizational information. Voice processing is a limited exception because information necessary to complete a voice command must be transmitted temporarily to the service provider responsible for processing that command.",
  },
  {
    title: "8. No Sale of Classroom or Student Information",
    body: "Companion Education does not sell or rent student personally identifiable information. Companion Education does not sell or rent users’ classroom content. Companion Education does not use classroom content to create advertising profiles. Our applications are not designed to collect student personally identifiable information for marketing or advertising purposes.",
  },
  {
    title: "9. Advertising and Profiling",
    body: "Companion Education does not use student information to provide behavioral or targeted advertising to students. Companion Education does not build advertising profiles based on users’ classroom notes or student-reference information.",
  },
  {
    title: "10. Analytics and Service Performance",
    body: "Companion Education may use limited technical information to understand whether an application is functioning properly, diagnose errors, maintain security, and improve application performance. Companion Education does not intend to use classroom content or student-reference information to create behavioral profiles of educators or students. Third-party hosting, infrastructure, or technology providers may maintain technical or security logs as part of operating their services.",
  },
  {
    title: "11. Third-Party Technology Providers",
    body: "Companion Education may rely on third-party service providers for functions such as: website and application hosting, content delivery, technical infrastructure, security, error monitoring, voice processing, artificial intelligence processing, payment processing, email communications, and customer support. These providers may process limited information necessary to perform their respective services. Users must not submit personally identifiable student information through Companion Education applications, including features that rely on third-party technology providers. Third-party providers may have their own privacy, security, logging, and retention practices.",
  },
  {
    title: "12. Educational Records and FERPA",
    body: "Companion Education applications are designed to reduce the need to transmit or centrally store personally identifiable student information. Companion Education is not intended to replace a school or district’s approved student information system, special education records system, electronic educational records system, health records system, or other authorized repository for confidential student information. Schools, districts, administrators, and educators remain responsible for determining whether their use of technology complies with applicable laws, regulations, district policies, contractual obligations, and professional responsibilities, including requirements relating to educational records and student privacy. Users should follow the privacy, technology, and records-management policies established by their school or district.",
  },
  {
    title: "13. Children’s Privacy",
    body: "Companion Education educator productivity applications are designed primarily for use by educators, administrators, and other authorized adults. They are not intended for children to independently create accounts or submit personal information unless a specific Companion Education product expressly states otherwise. Users must not use Companion Education applications to intentionally collect personal information directly from children unless a specific feature has been expressly designed and authorized for that purpose.",
  },
  {
    title: "14. Security",
    body: "Companion Education uses reasonable safeguards appropriate to the nature of the information handled by its services. However, no device, browser, internet connection, website, application, or third-party service can guarantee absolute security. For that reason, our primary privacy strategy is to minimize the collection and centralized storage of sensitive information. Users should also take reasonable steps to protect their own devices, including using appropriate device passwords, screen locks, security updates, and other safeguards required by their school or employer.",
  },
  {
    title: "15. User Responsibility",
    body: "Companion Education provides tools intended to help educators organize and manage their work while minimizing the need to enter personally identifiable information. Users are responsible for the information they choose to enter, speak, export, download, copy, or otherwise use within the application. Users must not enter or speak personally identifiable student information or other confidential or sensitive personal information. Users are also responsible for complying with their employer’s privacy, technology, records-management, and acceptable-use policies.",
  },
  {
    title: "16. Accidental Entry of Personally Identifiable Information",
    body: "Companion Education does not request or require personally identifiable student information for normal use of its educator productivity applications. If a user accidentally enters personally identifiable information into a locally stored portion of the application, the user should promptly delete that information. If personally identifiable information is accidentally submitted through a voice-processing feature or another third-party service, users should discontinue including that information and follow any applicable school or district reporting requirements.",
  },
  {
    title: "17. Changes to This Privacy Policy",
    body: "Companion Education™ may update this Privacy Policy as our applications, service providers, technology, features, or legal requirements change. When material changes are made, the revised effective date will be displayed at the top of this policy. Users should review this Privacy Policy periodically.",
  },
  {
    title: "18. Contact Companion Education™",
    body: "Questions about this Privacy Policy or Companion Education’s privacy practices may be directed to: Companion Education™, 100 Whittington Place, Etna Ohio 43062, privacy@companioneducation.com.",
  },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-5">
          <div className="flex items-start gap-3">
            <img
              src={appleLogo}
              alt="Companion Education apple mark"
              className="h-11 w-11 shrink-0 rounded-xl bg-primary-foreground/10 p-1"
            />
            <div>
              <p className="text-xs uppercase tracking-wide opacity-80">Legal</p>
              <h1 className="text-lg font-semibold sm:text-xl">Companion Education™ Privacy</h1>
            </div>
          </div>
          <Button asChild variant="secondary" size="sm" className="h-7 gap-1 rounded-full px-3 text-xs">
            <Link to="/">
              <ArrowLeft className="h-3 w-3" /> Back to app
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <p className="text-sm font-medium">Effective Date: July 1, 2026</p>

        <Card className="border-none bg-primary text-primary-foreground">
          <CardContent className="space-y-2 pt-6">
            <p className="text-base font-semibold leading-relaxed">
              At Companion Education™, we believe educator tools should collect and store as little sensitive information as possible.
            </p>
            <p className="text-sm opacity-90">
              Our applications are designed so that teachers and administrators can organize their work without creating another cloud database full of student information.
            </p>
          </CardContent>
        </Card>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-primary">The most important rule is simple</h2>
          <h3 className="text-base font-semibold">Do Not Enter Personally Identifiable Student Information</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Companion Education applications are not designed for storing personally identifiable student information. Users should not enter, upload, record, or speak information such as:
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Full student names</li>
            <li>Student identification numbers</li>
            <li>Birth dates</li>
            <li>Home addresses</li>
            <li>Personal email addresses</li>
            <li>Phone numbers</li>
            <li>Medical or health information</li>
            <li>Disability information</li>
            <li>IEP information</li>
            <li>504 Plan information</li>
            <li>Disciplinary records</li>
            <li>Individually identifiable grades or assessment information</li>
            <li>Confidential educational records</li>
            <li>Any other information that could reasonably identify a particular student</li>
          </ul>
          <p className="text-sm leading-relaxed text-muted-foreground">
            When you need to refer to a student, use initials, a non-identifying nickname, a general description, or a teacher-created reference number that is not an official student identification number.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-primary">Your App Information Stays on Your Device</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            For Companion Education applications that use local storage, the information you create in the app is stored through your device or browser. Companion Education does not maintain a centralized cloud database containing your:
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Classroom notes</li>
            <li>Student tracking information</li>
            <li>Teacher reminders</li>
            <li>Instructional planning information</li>
            <li>Task lists</li>
            <li>Daily priorities</li>
            <li>Organizational information</li>
          </ul>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Your locally stored information remains under your control on your device unless you choose to export, download, copy, print, or otherwise move it. Because this information is stored locally, users are responsible for protecting their devices and managing any files they choose to export.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-primary">How Voice Features Work</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Some Companion Education applications include optional voice-enabled features. When you choose to use a voice feature, the information necessary to process your command is transmitted to Google Gemini. That information may be retained temporarily by the service provider as part of processing, securing, monitoring, and operating the service.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Companion Education uses a paid Google Gemini API configuration under which prompts and responses submitted through the API are not used by Google to train or improve its artificial intelligence models. Companion Education does not maintain a cloud database containing your voice recordings or voice-command history.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Because voice commands must be transmitted for processing, users should never speak personally identifiable student information, confidential educational records, medical information, or other sensitive personal information into a voice-enabled feature.
          </p>
          <div className="rounded-lg border bg-card p-4 text-card-foreground">
            <p className="text-sm font-semibold">Instead of saying:</p>
            <p className="text-sm italic text-muted-foreground">
              “Remind me to meet with Sophia Williams about her reading assessment.”
            </p>
            <p className="mt-2 text-sm font-semibold">Use something like:</p>
            <p className="text-sm text-muted-foreground">“Remind me to meet with SW about reading.”</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-primary">What About Device Information?</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Companion Education does not maintain a cloud database designed to build individual device profiles or track your classroom activity across devices. However, like other web-based applications, Companion Education relies on internet infrastructure and third-party technology providers. Those providers may automatically process limited technical information necessary to deliver, secure, troubleshoot, and operate their services.
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Operating system</li>
            <li>Device type</li>
            <li>Request timestamps</li>
            <li>Error or diagnostic information</li>
            <li>Security logs</li>
            <li>Network information</li>
          </ul>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This technical processing is different from Companion Education storing your classroom notes, student tracking information, or other user-created content in a cloud database.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-primary">What Companion Education™ Does Not Do</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">Companion Education does not:</p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Maintain a centralized cloud database of your classroom content</li>
            <li>Sell or rent student personally identifiable information</li>
            <li>Sell or rent your classroom content</li>
            <li>Use classroom content to create advertising profiles</li>
            <li>Use student information for behavioral or targeted advertising</li>
            <li>Intentionally collect personally identifiable student information through its educator productivity applications</li>
            <li>Maintain a cloud history of your voice commands</li>
          </ul>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Our approach is to reduce the amount of sensitive information collected and stored in the first place. Less sensitive information collected. Less sensitive information stored. Less sensitive information at risk.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-primary">Full Companion Education™ Privacy Policy</h2>
          {SECTIONS.map((section) => (
            <Card key={section.title}>
              <CardContent className="space-y-2 pt-5">
                <h3 className="text-sm font-semibold">{section.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{section.body}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}
