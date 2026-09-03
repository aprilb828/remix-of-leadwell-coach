import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import appleLogo from "@/assets/companion-apple.png";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Companion Education-Coach Edition™" },
      {
        name: "description",
        content:
          "Companion Education™ Terms & Conditions governing the use of our educator productivity tools, voice features, and local-first applications.",
      },
      {
        property: "og:title",
        content: "Terms & Conditions — Companion Education-Coach Edition™",
      },
      {
        property: "og:description",
        content:
          "Companion Education™ Terms & Conditions governing the use of our educator productivity tools, voice features, and local-first applications.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

const SECTIONS: { title: string; children: ReactNode }[] = [
  {
    title: "1. About Companion Education™",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education™ provides digital productivity, planning, organization, instructional support, and professional workflow tools primarily for educators and school administrators.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education applications are intended to assist users with managing their professional responsibilities. They are not student information systems, official educational record systems, medical record systems, special education record systems, or substitutes for school- or district-approved systems used to maintain confidential records.
        </p>
      </>
    ),
  },
  {
    title: "2. Eligibility",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education products are intended primarily for educators, administrators, education professionals, and other authorized adult users.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          You must be legally able to enter into a binding agreement to purchase or use Companion Education products.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Unless a particular product expressly states otherwise, Companion Education applications are not intended for independent use by children or students.
        </p>
      </>
    ),
  },
  {
    title: "3. User Responsibility",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          You are responsible for how you use Companion Education products and for ensuring that your use complies with:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Applicable laws and regulations</li>
          <li>Your school or district policies</li>
          <li>Employer technology policies</li>
          <li>Student privacy requirements</li>
          <li>Acceptable-use policies</li>
          <li>Records-management requirements</li>
          <li>Professional responsibilities</li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education does not determine whether a particular school or district permits the use of a specific technology or application.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          It is your responsibility to obtain any approvals required by your employer.
        </p>
      </>
    ),
  },
  {
    title: "4. Personally Identifiable Information",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education applications are designed to minimize the need to collect or store personally identifiable information.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          You must not enter, upload, record, or speak personally identifiable student information or other confidential personal information into Companion Education applications.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">Prohibited information includes, but is not limited to:</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Full student names</li>
          <li>Official student identification numbers</li>
          <li>Birth dates</li>
          <li>Home addresses</li>
          <li>Personal email addresses</li>
          <li>Phone numbers</li>
          <li>Medical or health information</li>
          <li>Disability information</li>
          <li>Individualized Education Program (IEP) information</li>
          <li>504 Plan information</li>
          <li>Disciplinary records</li>
          <li>Individually identifiable grades or assessment information</li>
          <li>Confidential educational records</li>
          <li>Any other information that could reasonably identify a particular student</li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground">
          When referring to students, users should use initials, non-identifying nicknames, general descriptions, or teacher-created reference numbers that are not official school or district identification numbers.
        </p>
      </>
    ),
  },
  {
    title: "5. Local Storage and User Data",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Some Companion Education applications are designed to store user-created content locally through the user’s device or browser rather than in a Companion Education cloud database.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">This may include information such as:</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Notes</li>
          <li>Reminders</li>
          <li>Student-reference information</li>
          <li>Instructional planning information</li>
          <li>Task lists</li>
          <li>Daily priorities</li>
          <li>Student tracking information</li>
          <li>Other organizational content</li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground">
          You are responsible for protecting your device and any information stored on it.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          You are also responsible for maintaining any backups you consider necessary.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education cannot guarantee recovery of information that is lost because of:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Device failure</li>
          <li>Browser changes</li>
          <li>Clearing browser data</li>
          <li>Application deletion</li>
          <li>Device replacement</li>
          <li>Operating system changes</li>
          <li>User error</li>
          <li>Security incidents</li>
          <li>Other circumstances outside Companion Education’s reasonable control</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Exported Information",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Certain Companion Education products may allow users to export, download, copy, print, or otherwise transfer information.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Once information leaves the Companion Education application, you are responsible for securely storing, transmitting, sharing, and deleting that information.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          You must not intentionally include personally identifiable student information or other confidential information in exported files.
        </p>
      </>
    ),
  },
  {
    title: "7. Voice-Enabled Features",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Certain Companion Education applications may include optional voice-enabled features.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          When you choose to use a voice feature, information necessary to process the command may be transmitted to Google Gemini or another technology provider used to deliver the feature.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Information submitted through a voice feature may be retained temporarily by the applicable service provider for processing, security, monitoring, or service operation.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education uses a paid Google Gemini API configuration under which prompts and responses submitted through that service are not used by Google to train or improve its artificial intelligence models.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Users must not speak personally identifiable student information, confidential educational records, medical information, or other sensitive personal information into voice-enabled features.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Voice-enabled features may occasionally misunderstand, incorrectly interpret, or fail to process a command. Users are responsible for reviewing information created through voice commands before relying on it.
        </p>
      </>
    ),
  },
  {
    title: "8. Artificial Intelligence and Automated Features",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Some Companion Education products may use artificial intelligence or automated processing to assist with functions such as interpreting voice commands, organizing information, generating suggestions, or performing other application functions.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Artificial intelligence systems can produce incomplete, inaccurate, or unexpected results.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Users should exercise professional judgment and review AI-assisted outputs before relying on them.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education does not guarantee that AI-generated or AI-assisted information will always be accurate, complete, current, or appropriate for every situation.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          AI features should not be used as a substitute for professional educational judgment, legal advice, medical advice, psychological assessment, special education determinations, or other professional decision-making.
        </p>
      </>
    ),
  },
  {
    title: "9. Educational Decisions",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education products are productivity and organizational tools.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          They are not designed to make decisions concerning:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Student eligibility</li>
          <li>Special education placement</li>
          <li>Student discipline</li>
          <li>Medical treatment</li>
          <li>Psychological evaluation</li>
          <li>Academic placement</li>
          <li>Employment decisions</li>
          <li>Legal compliance determinations</li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Educators and administrators remain responsible for professional decisions made using information organized or displayed through Companion Education.
        </p>
      </>
    ),
  },
  {
    title: "10. Accounts and Access",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          If a Companion Education product requires an account, you are responsible for maintaining the confidentiality of your login credentials.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          You may not share account credentials in a manner that allows unauthorized users to access a product unless the applicable purchase expressly permits shared access.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          You are responsible for activity occurring through your account.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          You should promptly notify Companion Education if you believe your account or access credentials have been compromised.
        </p>
      </>
    ),
  },
  {
    title: "11. Communications from Companion Education™",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          By purchasing, creating an account for, accessing, or using a Companion Education™ product, you agree to receive communications that are reasonably related to your use of the product or service.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">These communications may include:</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Account and access information</li>
          <li>Purchase and billing confirmations</li>
          <li>Product updates</li>
          <li>Feature announcements</li>
          <li>Security or privacy notices</li>
          <li>Changes to these Terms or the Privacy Policy</li>
          <li>Service interruptions or technical notices</li>
          <li>Customer support communications</li>
          <li>Information necessary to administer or support your use of Companion Education™</li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground">
          These service-related communications are considered part of your use of the applicable product and may be sent by email or another contact method you provide.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          From time to time, Companion Education™ may also send optional educational, promotional, or marketing communications. Where required by law, these communications will be sent only with appropriate consent and will include a method to unsubscribe or adjust communication preferences.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Unsubscribing from promotional communications will not prevent you from receiving necessary transactional, account, security, legal, or service-related communications.
        </p>
      </>
    ),
  },
  {
    title: "12. Purchases and Licenses",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Purchasing a Companion Education digital product gives you a limited license to use that product according to these Terms and the terms presented at the time of purchase.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A purchase does not transfer ownership of the software, application, underlying code, design, trademarks, copyrights, proprietary methods, or other intellectual property.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Unless otherwise expressly stated at purchase, licenses are intended for use by the individual purchaser.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Separate licenses may be required for multiple educators, schools, departments, or districts.
        </p>
      </>
    ),
  },
  {
    title: "13. One-Time Purchases",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Some Companion Education products may be offered through a one-time purchase.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A one-time purchase provides access according to the product description and license terms presented at the time of sale.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A one-time purchase does not necessarily guarantee:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Lifetime operation on every future device or browser</li>
          <li>Permanent compatibility with third-party technology</li>
          <li>Unlimited future feature development</li>
          <li>Future premium services</li>
          <li>Cloud storage</li>
          <li>Future subscription-based functionality</li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education may update, improve, replace, or discontinue particular features when reasonably necessary because of technology, security, provider, legal, or operational changes.
        </p>
      </>
    ),
  },
  {
    title: "14. Subscriptions",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          If Companion Education offers subscription-based products, the price, billing frequency, renewal terms, and cancellation terms will be disclosed before purchase.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Unless otherwise stated, subscriptions may automatically renew according to the billing terms presented at checkout.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Users may cancel a subscription according to the cancellation process provided with that product.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Cancellation generally prevents future renewal charges but does not necessarily provide a refund for amounts already paid.
        </p>
      </>
    ),
  },
  {
    title: "15. Payment Plans",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Certain products may be offered through installment or payment plans.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          By selecting a payment plan, you authorize the applicable payment processor to charge the agreed installments according to the payment schedule disclosed at checkout.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A payment plan represents a commitment to pay the full purchase price unless the applicable offer expressly provides otherwise.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Failure to complete required payments may result in suspension or termination of access.
        </p>
      </>
    ),
  },
  {
    title: "16. Refunds",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Because Companion Education™ products are digital products that may provide immediate access upon purchase, single-payment purchases are non-refundable, except where a refund is required by applicable law.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          If Companion Education™ offers a subscription, payment plan, trial, guarantee, or other product-specific purchase arrangement, the refund and cancellation terms disclosed at checkout for that offer will apply.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Customers should review product descriptions carefully before purchasing and contact Companion Education™ with any questions before completing a purchase.
        </p>
      </>
    ),
  },
  {
    title: "17. Third-Party Services",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education may rely on third-party providers for services including:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Website hosting</li>
          <li>Application hosting</li>
          <li>Payment processing</li>
          <li>Artificial intelligence</li>
          <li>Voice processing</li>
          <li>Email delivery</li>
          <li>Authentication</li>
          <li>Technical infrastructure</li>
          <li>Security</li>
          <li>Customer support</li>
          <li>Analytics or diagnostics</li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education does not control every aspect of third-party platforms.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          The availability and functionality of certain Companion Education features may depend on third-party services.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A third-party provider may modify, restrict, interrupt, or discontinue its services, which could affect a Companion Education feature.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Where reasonably possible, Companion Education may modify or replace affected functionality.
        </p>
      </>
    ),
  },
  {
    title: "18. Acceptable Use",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          You may use Companion Education products only for lawful and authorized purposes.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">You may not:</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Use the service to violate student privacy laws or policies</li>
          <li>Intentionally enter prohibited personally identifiable information</li>
          <li>Attempt to gain unauthorized access to the application or related systems</li>
          <li>Circumvent security controls</li>
          <li>Interfere with application operation</li>
          <li>Introduce malicious software or code</li>
          <li>Reverse engineer the application except where expressly permitted by law</li>
          <li>Copy or reproduce proprietary portions of the application</li>
          <li>Resell or redistribute access without permission</li>
          <li>Present Companion Education products as your own</li>
          <li>Remove copyright, trademark, or proprietary notices</li>
          <li>Use the application to harass, harm, impersonate, or unlawfully monitor another person</li>
          <li>Use the service for unlawful, fraudulent, or abusive purposes</li>
        </ul>
      </>
    ),
  },
  {
    title: "19. Intellectual Property",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education™ and associated product names, branding, graphics, interface designs, software, written materials, instructional frameworks, and original content are owned by or licensed to Companion Education and are protected by applicable intellectual property laws.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Your purchase or use of a Companion Education product does not grant ownership of Companion Education intellectual property.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          You may not reproduce, sell, sublicense, distribute, modify, publish, or create competing derivative products from proprietary Companion Education materials except with prior written permission or where expressly permitted by the applicable license.
        </p>
      </>
    ),
  },
  {
    title: "20. Companion Education™ Trademark",
    children: (
      <p className="text-sm leading-relaxed text-muted-foreground">
        Companion Education™ is used as a trademark identifying Companion Education products and services. Nothing in these Terms grants permission to use the Companion Education name, logo, product names, branding, or other marks for commercial purposes without prior written authorization.
      </p>
    ),
  },
  {
    title: "21. Product Changes and Availability",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education may update applications from time to time to improve performance, security, usability, compatibility, or functionality.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          We may add, modify, replace, or remove features when reasonably necessary.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          We do not guarantee that every product or feature will remain available indefinitely or function with every future browser, device, operating system, or third-party service.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Where a material change significantly affects a paid product, Companion Education will make reasonable efforts to communicate the change when appropriate.
        </p>
      </>
    ),
  },
  {
    title: "22. Service Interruptions",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education strives to provide reliable access but does not guarantee uninterrupted or error-free service.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Access may occasionally be interrupted because of:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Maintenance</li>
          <li>Software updates</li>
          <li>Hosting issues</li>
          <li>Internet disruptions</li>
          <li>Third-party service failures</li>
          <li>Security events</li>
          <li>Technical problems</li>
          <li>Events beyond our reasonable control</li>
        </ul>
      </>
    ),
  },
  {
    title: "23. Disclaimer of Warranties",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          To the extent permitted by law, Companion Education products and services are provided on an “as is” and “as available” basis.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education does not guarantee that:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Every feature will operate without interruption</li>
          <li>Every application will be error-free</li>
          <li>Information generated or organized by the application will always be accurate</li>
          <li>Information stored locally will never be lost</li>
          <li>Every product will meet every user’s individual requirements</li>
          <li>Every school or district will approve the use of the product</li>
          <li>Every third-party service will remain available</li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Nothing in these Terms excludes warranties or rights that cannot legally be excluded.
        </p>
      </>
    ),
  },
  {
    title: "24. Limitation of Liability",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          To the fullest extent permitted by applicable law, Companion Education will not be liable for indirect, incidental, special, consequential, or punitive damages arising from the use or inability to use a Companion Education product.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          This may include losses resulting from:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Loss of locally stored information</li>
          <li>Device failure</li>
          <li>User error</li>
          <li>Unauthorized device access</li>
          <li>Reliance on AI-generated information</li>
          <li>Third-party service interruption</li>
          <li>Failure to comply with school or district policies</li>
          <li>User entry of prohibited confidential information</li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground">
          To the extent permitted by law, Companion Education’s total liability relating to a paid product will not exceed the amount paid by the user for the applicable product during the period giving rise to the claim.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Some jurisdictions do not allow certain limitations of liability, so portions of this section may not apply to every user.
        </p>
      </>
    ),
  },
  {
    title: "25. Indemnification",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          To the extent permitted by applicable law, you agree to be responsible for claims, losses, or expenses resulting from your misuse of Companion Education products, violation of these Terms, violation of applicable law, or unauthorized submission of confidential or personally identifiable information.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          This provision does not apply to the extent a claim results directly from Companion Education’s own unlawful conduct.
        </p>
      </>
    ),
  },
  {
    title: "26. Suspension or Termination",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education may suspend or terminate access when reasonably necessary if a user:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Materially violates these Terms</li>
          <li>Engages in fraudulent activity</li>
          <li>Attempts to compromise application security</li>
          <li>Redistributes or resells the product without authorization</li>
          <li>Uses the product unlawfully</li>
          <li>Fails to complete required payments</li>
          <li>Engages in conduct that threatens the application, Companion Education, or other users</li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Where appropriate, Companion Education may provide notice or an opportunity to correct the issue before terminating access.
        </p>
      </>
    ),
  },
  {
    title: "27. Privacy",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Use of Companion Education products is also governed by the Companion Education™ Privacy Policy.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          The Privacy Policy explains how information is handled, including local storage, third-party technical processing, and voice-enabled features.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          If there is a conflict between these Terms and the Privacy Policy regarding how personal information is handled, the Privacy Policy will govern that issue.
        </p>
      </>
    ),
  },
  {
    title: "28. Changes to These Terms",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education™ may update these Terms as products, services, technologies, business practices, or legal requirements change.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          When material changes are made, the updated effective date will appear at the top of these Terms.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Continued use of the service after updated Terms become effective constitutes acceptance of the revised Terms to the extent permitted by applicable law.
        </p>
      </>
    ),
  },
  {
    title: "29. Governing Law",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          These Terms are governed by the laws of the State of Ohio, without regard to conflict-of-law principles, except where applicable law requires otherwise.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Any legal dispute relating to these Terms or Companion Education products will be handled in an appropriate court located in Ohio unless applicable law requires another location or the parties agree otherwise.
        </p>
      </>
    ),
  },
  {
    title: "30. Severability",
    children: (
      <p className="text-sm leading-relaxed text-muted-foreground">
        If any portion of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in effect to the fullest extent permitted by law.
      </p>
    ),
  },
  {
    title: "31. Entire Agreement",
    children: (
      <p className="text-sm leading-relaxed text-muted-foreground">
        These Terms, together with the Companion Education™ Privacy Policy and any product-specific purchase terms presented at checkout, constitute the agreement between the user and Companion Education regarding use of the applicable product.
      </p>
    ),
  },
  {
    title: "32. Contact Companion Education™",
    children: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Questions regarding these Terms may be directed to:
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Companion Education™
          <br />
          100 Whittington Place,
          <br />
          Etna Ohio 43062
          <br />
          <a
            href="mailto:terms@companioneducation.com"
            className="underline underline-offset-2 hover:text-foreground"
          >
            terms@companioneducation.com
          </a>
        </p>
      </>
    ),
  },
];

function TermsPage() {
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
              <h1 className="text-lg font-semibold sm:text-xl">Companion Education™ Terms</h1>
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
              These Terms &amp; Conditions (“Terms”) govern your access to and use of Companion Education™ websites, applications, digital products, tools, and related services.
            </p>
            <p className="text-sm opacity-90">
              By purchasing, accessing, or using a Companion Education product or service, you agree to these Terms. If you do not agree to these Terms, you should not use Companion Education products or services.
            </p>
          </CardContent>
        </Card>

        {SECTIONS.map((section) => (
          <section key={section.title} className="space-y-3">
            <h2 className="text-base font-semibold">{section.title}</h2>
            {section.children}
          </section>
        ))}
      </main>

      <div className="mx-auto max-w-3xl px-4 pb-8">
        <SiteFooter />
      </div>
    </div>
  );
}
