import type { Metadata } from "next";
import Link from "next/link";

const title = "Privacy Policy";
const description = "How Calculator Hub handles your data — what's collected, what isn't, and how the contact form works.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        All calculators
      </Link>

      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted">Last updated: September 1, 2026</p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">The short version</h2>
        <p className="text-muted">
          The calculators on this site run entirely in your browser. What
          you type into them — loan amounts, income, health details,
          cycle dates, anything — is never sent to a server, stored, or
          seen by us. The only feature that transmits data anywhere is the
          contact form.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">
          What we don&apos;t collect
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-muted">
          <li>No accounts, sign-ups, or passwords.</li>
          <li>No cookies, analytics scripts, or advertising trackers.</li>
          <li>
            No local storage of calculator inputs — reload the page and
            everything resets, because nothing was saved in the first
            place.
          </li>
          <li>
            Calculator inputs and results (mortgage amounts, income, BMI,
            cycle dates, etc.) never leave your device.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">
          The contact form
        </h2>
        <p className="text-muted">
          If you use the{" "}
          <Link href="/contact#contact" className="text-accent hover:underline">
            contact form
          </Link>
          , the name, email address, and message you submit are sent by
          email to the person who runs this site, using{" "}
          <a
            href="https://resend.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Resend
          </a>{" "}
          as the email delivery provider. That information is used solely
          to respond to your message — it isn&apos;t added to a mailing
          list, sold, or shared with anyone else. Resend processes the
          message on our behalf as a service provider; see{" "}
          <a
            href="https://resend.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Resend&apos;s own privacy policy
          </a>{" "}
          for how they handle data in transit.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Hosting logs</h2>
        <p className="text-muted">
          Like virtually any website, the server or hosting provider this
          site runs on may keep standard technical logs (IP address,
          browser user-agent, requested page, timestamp) for security and
          debugging purposes. These aren&apos;t linked to any calculator
          input, aren&apos;t used for tracking or advertising, and aren&apos;t
          shared with third parties beyond what the hosting provider itself
          requires to operate.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Changes</h2>
        <p className="text-muted">
          If this policy changes in a way that meaningfully affects how
          data is handled, the &quot;Last updated&quot; date above will
          change to reflect it.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Questions</h2>
        <p className="text-muted">
          Reach out via the{" "}
          <Link href="/contact#contact" className="text-accent hover:underline">
            contact form
          </Link>{" "}
          with anything you&apos;d like clarified.
        </p>
      </section>
    </div>
  );
}
