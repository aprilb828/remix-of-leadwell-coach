import type React from "react";
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

type Item = ["li" | "p", string];
const SECTIONS: { part: string | null; title: string; items: Item[] }[] = [
  {
    "part": "Part A: Website, free resources, and email",
    "title": "1. Information we collect",
    "items": [
      [
        "p",
        "When you visit companioneducation.com or sign up for a free resource (such as the Daily 10 Teacher Reset), we may collect:"
      ],
      [
        "li",
        "Your name and email address"
      ],
      [
        "li",
        "Any other answers you choose to give on a sign-up form, such as your role"
      ],
      [
        "li",
        "Whether you open or click our emails"
      ],
      [
        "li",
        "Basic website analytics, such as pages visited, browser type, and approximate location based on your IP address"
      ]
    ]
  },
  {
    "part": null,
    "title": "2. How we use it",
    "items": [
      [
        "p",
        "We use this information to:"
      ],
      [
        "li",
        "Deliver the free resource you requested"
      ],
      [
        "li",
        "Send occasional emails with teaching and leadership tips, new free resources, and information about our products"
      ],
      [
        "li",
        "Answer your questions"
      ],
      [
        "li",
        "Understand which pages and resources are helpful so we can improve them"
      ]
    ]
  },
  {
    "part": null,
    "title": "3. Unsubscribing",
    "items": [
      [
        "p",
        "Every marketing email includes an unsubscribe link. You can also email privacy@companioneducation.com to be removed. If you unsubscribe, we will stop sending marketing emails, although we may still send messages about a purchase you have made."
      ]
    ]
  },
  {
    "part": null,
    "title": "4. Cookies and analytics",
    "items": [
      [
        "p",
        "Our website and sign-up pages use cookies and similar tools to keep forms working, remember your preferences, and measure site performance. You can block or delete cookies in your browser settings; some forms may not work correctly without them. Your classroom content inside our apps is never used for website analytics or advertising."
      ]
    ]
  },
  {
    "part": "Part B: Purchases and paid apps",
    "title": "5. Purchases and payments",
    "items": [
      [
        "p",
        "Payments are handled by a third-party payment processor. Companion Education does not see or store your full card number. When you buy, we receive your name, email address, and purchase details so we can deliver your access, provide support, and keep the records we need for accounting and tax purposes."
      ]
    ]
  },
  {
    "part": null,
    "title": "6. Personal information inside paid apps",
    "items": [
      [
        "p",
        "In our paid apps, the only personal information we collect is your email address. We use it to verify your access, send important service messages, and provide support. We do not collect your name, school, or any other personal details inside the apps."
      ]
    ]
  },
  {
    "part": "Part C: Classroom content in our apps",
    "title": "7. Do not enter personally identifiable student information",
    "items": [
      [
        "p",
        "Our apps are not designed to store personally identifiable student information. Do not enter, upload, record, or speak information such as:"
      ],
      [
        "li",
        "Full student names"
      ],
      [
        "li",
        "Student identification numbers"
      ],
      [
        "li",
        "Birth dates"
      ],
      [
        "li",
        "Home addresses, personal email addresses, or phone numbers"
      ],
      [
        "li",
        "Medical, health, or disability information"
      ],
      [
        "li",
        "IEP or 504 Plan information"
      ],
      [
        "li",
        "Disciplinary records"
      ],
      [
        "li",
        "Individually identifiable grades or assessment information"
      ],
      [
        "li",
        "Confidential educational records"
      ],
      [
        "li",
        "Any other information that could reasonably identify a particular student"
      ],
      [
        "p",
        "To refer to a student, use initials, a non-identifying nickname, a general description, or a reference number you create yourself that is not an official student ID. The same applies to information about families, staff members, and other people."
      ]
    ]
  },
  {
    "part": null,
    "title": "8. Your app content stays on your device",
    "items": [
      [
        "p",
        "For apps that use local storage, the notes, reminders, instructional plans, student-reference notes, task lists, and daily priorities you create are stored in your device or browser. Companion Education does not maintain a centralized cloud database of this content. It stays on your device until you delete it or clear it through your browser or device settings. Because the content is stored locally, you are responsible for protecting your device."
      ]
    ]
  },
  {
    "part": null,
    "title": "9. Exported or downloaded information",
    "items": [
      [
        "p",
        "Some apps let you export, download, copy, or print your content. Once you do, you are responsible for storing, sharing, and deleting that copy securely. Exported content should also be free of personally identifiable student information."
      ]
    ]
  },
  {
    "part": null,
    "title": "10. Voice features",
    "items": [
      [
        "p",
        "Some apps include optional voice features. When you use one, the information needed to process your command is sent to Google Gemini. Google may keep it briefly to provide, secure, and monitor the service. We use a paid Google Gemini API configuration under which prompts and responses are not used to train or improve Google's AI models. Companion Education does not keep a cloud database of your voice recordings or voice-command history. Never speak personally identifiable student information or other sensitive information into a voice feature."
      ]
    ]
  },
  {
    "part": null,
    "title": "11. Device and technical information",
    "items": [
      [
        "p",
        "Like other web-based apps, ours rely on hosting and technology providers. These providers may automatically process limited technical information, such as IP address, browser type, operating system, device type, request times, and error and security logs, to deliver, secure, and troubleshoot their services. This is separate from your classroom content, which we do not store in the cloud. We do not use this information to build device profiles or to follow your classroom activity across devices."
      ]
    ]
  },
  {
    "part": "Part D: Policies that apply everywhere",
    "title": "12. Service providers",
    "items": [
      [
        "p",
        "We use trusted providers for website and funnel hosting (including Captivation Hub), email delivery, payment processing, app hosting, security and error monitoring, and voice processing (Google Gemini). Each receives only the information it needs to perform its service and may have its own privacy and retention practices."
      ]
    ]
  },
  {
    "part": null,
    "title": "13. What Companion Education does not do",
    "items": [
      [
        "p",
        "Companion Education does not:"
      ],
      [
        "li",
        "Sell or rent your personal information"
      ],
      [
        "li",
        "Sell or rent student information or your classroom content"
      ],
      [
        "li",
        "Maintain a centralized cloud database of your classroom content"
      ],
      [
        "li",
        "Use classroom content or student information for advertising or to build profiles"
      ],
      [
        "li",
        "Keep a cloud history of your voice commands"
      ],
      [
        "li",
        "Require personally identifiable student information for normal use of any app"
      ]
    ]
  },
  {
    "part": null,
    "title": "14. Educational records and FERPA",
    "items": [
      [
        "p",
        "Our apps are designed so you never need to send or centrally store personally identifiable student information. They are not a replacement for your school's student information system, special education system, or any other approved records system. Schools, districts, and educators are responsible for deciding whether their use of any technology meets applicable laws and district policies, including those covering student records and privacy."
      ]
    ]
  },
  {
    "part": null,
    "title": "15. Children's privacy",
    "items": [
      [
        "p",
        "Our website, free resources, and apps are for educators and other adults. They are not intended for anyone under 18, and we do not knowingly collect personal information from children. If you believe a child has given us personal information, contact us and we will delete it."
      ]
    ]
  },
  {
    "part": null,
    "title": "16. How long we keep information",
    "items": [
      [
        "li",
        "Email list information: Kept until you unsubscribe or ask us to delete it"
      ],
      [
        "li",
        "Purchase records: Kept as long as needed for access, support, accounting, and legal requirements"
      ],
      [
        "li",
        "App email address: Kept while your access is active, and then as long as purchase records require"
      ],
      [
        "li",
        "Classroom content: Not held by us; it stays on your device until you delete it"
      ]
    ]
  },
  {
    "part": null,
    "title": "17. Security",
    "items": [
      [
        "p",
        "We use reasonable safeguards for the information we handle, but no website, app, device, or internet connection can be guaranteed completely secure. That's why our main privacy strategy is to collect and store as little sensitive information as possible. Please protect your own devices with passcodes, screen locks, and updates, along with any safeguards your school requires."
      ]
    ]
  },
  {
    "part": null,
    "title": "18. Your choices and rights",
    "items": [
      [
        "p",
        "You can ask us to show you, correct, or delete the personal information we hold about you (your name, email address, and purchase records), and you can unsubscribe from marketing emails at any time. Depending on where you live, you may have additional rights under state privacy laws. To make a request, email privacy@companioneducation.com. We will respond within 30 days."
      ]
    ]
  },
  {
    "part": null,
    "title": "19. If sensitive information is entered by mistake",
    "items": [
      [
        "p",
        "If you accidentally enter personally identifiable student information into a locally stored part of an app, delete it promptly. If it was sent through a voice feature, stop including it and follow your school or district's reporting requirements."
      ]
    ]
  },
  {
    "part": null,
    "title": "20. Changes to this policy",
    "items": [
      [
        "p",
        "We may update this policy as our products, providers, or legal requirements change. When we make significant changes, we will update the effective date at the top. If you are on our email list, we may also notify you by email."
      ]
    ]
  },
  {
    "part": null,
    "title": "21. Contact us",
    "items": [
      [
        "p",
        "Companion Education™ 100 Whittington Place Etna, Ohio 43062 privacy@companioneducation.com"
      ]
    ]
  }
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
        <p className="text-sm font-medium">Effective Date: September 27, 2026</p>

        <Card className="border-none bg-primary text-primary-foreground">
          <CardContent className="space-y-2 pt-6">
            <p className="text-base font-semibold leading-relaxed">
              Companion Education™ believes educator tools should collect and store as little information as possible.
            </p>
            <p className="text-sm opacity-90">
              This policy explains what we collect in three places: our website and free resources, our paid apps, and the classroom content you create inside those apps.
            </p>
          </CardContent>
        </Card>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-primary">At a glance</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li><span className="font-semibold text-foreground">Free resources and emails:</span> When you sign up for a free resource, we collect your name and email address so we can send it to you and share occasional updates. You can unsubscribe anytime.</li>
            <li><span className="font-semibold text-foreground">Paid apps:</span> Inside our paid apps, the only personal information we collect is your email address, which we use to give you access and support.</li>
            <li><span className="font-semibold text-foreground">Classroom content:</span> Your notes, reminders, and plans are stored on your own device, not in a Companion Education cloud database.</li>
            <li><span className="font-semibold text-foreground">Student information:</span> Our apps never need personally identifiable student information, and you should not enter it.</li>
            <li><span className="font-semibold text-foreground">Voice features:</span> Optional voice commands are processed by Google Gemini under a paid configuration that does not use your prompts to train Google's models.</li>
            <li><span className="font-semibold text-foreground">Never sold:</span> We do not sell or rent your personal information, your classroom content, or any student information.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-primary">Who we are</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Companion Education™ (Companion Education Company) is a dba of Ayelco Bright Solutions, 100 Whittington Place, Etna, Ohio 43062. Questions about this policy can be sent to privacy@companioneducation.com.
          </p>
        </section>

        <section className="space-y-4">
          {SECTIONS.map((section) => (
            <div key={section.title} className="space-y-4">
              {section.part && (
                <h2 className="pt-2 text-sm font-semibold text-primary">{section.part}</h2>
              )}
              <Card>
                <CardContent className="space-y-2 pt-5">
                  <h3 className="text-sm font-semibold">{section.title}</h3>
                  {(() => {
                    const out: React.ReactNode[] = [];
                    let list: string[] = [];
                    const flush = (k: number) => {
                      if (list.length) {
                        out.push(
                          <ul key={`ul-${k}`} className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                            {list.map((t) => <li key={t}>{t}</li>)}
                          </ul>,
                        );
                        list = [];
                      }
                    };
                    section.items.forEach(([kind, text], i) => {
                      if (kind === "li") list.push(text);
                      else {
                        flush(i);
                        out.push(<p key={i} className="text-sm leading-relaxed text-muted-foreground">{text}</p>);
                      }
                    });
                    flush(section.items.length);
                    return out;
                  })()}
                </CardContent>
              </Card>
            </div>
          ))}
        </section>

        <p className="text-center text-sm font-semibold text-primary">
          Less sensitive information collected. Less sensitive information stored. Less sensitive information at risk.
        </p>

        <SiteFooter />
      </main>
    </div>
  );
}
