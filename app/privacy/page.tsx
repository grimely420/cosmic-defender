import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Cosmic Defender",
  description: "Privacy Policy for Cosmic Defender at c-defender.dev.",
};

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', color: '#000000', minHeight: '100vh' }}>
      <main className="mx-auto max-w-3xl px-6 py-12 leading-relaxed" style={{ color: '#000000' }}>
      <Link href="/" className="hover:underline" style={{ color: '#059669' }}>
        &larr; Back to Cosmic Defender
      </Link>

      <header className="my-8 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest" style={{ color: '#059669' }}>
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm" style={{ color: '#333333' }}>
          Website: https://c-defender.dev &bull; Owner: Mark Geden
          <br />
          Effective Date: July 7, 2026 &bull; &copy; Mark Geden. All Rights
          Reserved.
        </p>
      </header>

      <section className="space-y-8 [&_h2]:mb-2 [&_h2]:border-b [&_h2]:pb-1 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mb-1 [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6" style={{ color: '#000000' }}>
        <div>
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy explains how Cosmic Defender (the
            &quot;Game&quot;) and the website c-defender.dev (the
            &quot;Site&quot;), owned and operated by Mark Geden
            (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), collect,
            use, store, and protect information about players and visitors
            (&quot;you&quot;). By using the Site or playing the Game, you agree
            to the practices described in this Policy.
          </p>
          <p className="mt-2">
            We are committed to collecting the minimum amount of data necessary
            to operate the Game and Site.
          </p>
        </div>

        <div>
          <h2>2. Information We Collect</h2>
          <h3>2.1 Automatically Collected Technical Data</h3>
          <p>
            When you visit the Site or play the Game, we may automatically
            collect:
          </p>
          <ul>
            <li>
              <strong>IP address</strong> &mdash; collected as part of standard
              internet communication;
            </li>
            <li>
              <strong>General location details</strong> &mdash; approximate
              region derived from your IP address (e.g., country,
              state/region). We do not collect precise GPS location.
            </li>
          </ul>
          <h3 className="mt-4">2.2 Gameplay Data</h3>
          <p>
            We collect information about your activity within the Game and on
            the Site, such as:
          </p>
          <ul>
            <li>Game scores and high scores</li>
            <li>Leaderboard rankings and display names/handles you choose</li>
            <li>Achievements and gameplay statistics</li>
            <li>Prize eligibility and prize history</li>
          </ul>
          <h3 className="mt-4">2.3 What We Do NOT Collect</h3>
          <p>
            We do <strong>not</strong> collect personal information during
            normal use of the Site or Game. This means we do not collect:
          </p>
          <ul>
            <li>Real names</li>
            <li>Email addresses or phone numbers</li>
            <li>Home or mailing addresses</li>
            <li>Payment card or banking information</li>
            <li>Precise geolocation data</li>
            <li>Biometric data</li>
          </ul>
          <p className="mt-2">
            The only exception is prize fulfillment, described in Section 4
            below.
          </p>
        </div>

        <div>
          <h2>3. How We Use Your Information</h2>
          <p>We use the limited data we collect only to:</p>
          <ul>
            <li>Operate, maintain, and secure the Site and the Game;</li>
            <li>Display scores, leaderboards, and gameplay achievements;</li>
            <li>Determine prize eligibility and administer prizes;</li>
            <li>Prevent cheating, fraud, and abuse;</li>
            <li>Comply with applicable legal obligations.</li>
          </ul>
        </div>

        <div>
          <h2>4. Prize Winners &mdash; Legal Information</h2>
          <p>
            If you win a prize or winnings through the Game or Site, we may
            need to collect certain legal information from you in order to pay
            out the prize and comply with the law. This may include your legal
            name, mailing address, and tax identification information.
          </p>
          <p className="mt-2">
            <strong>How this information is handled:</strong>
          </p>
          <ul>
            <li>
              It is used <strong>solely</strong> for prize payment and
              legal/tax compliance;
            </li>
            <li>
              It is <strong>never</strong> sold, rented, or shared with third
              parties, except where disclosure is required by law (for example,
              tax reporting to government authorities);
            </li>
            <li>
              It is <strong>erased</strong> after the retention period required
              by the jurisdiction in which you reside, in accordance with
              applicable state and federal regulations governing individuals
              who receive prizes or winnings from a gaming website.
            </li>
          </ul>
        </div>

        <div>
          <h2>5. We Do Not Sell Your Data</h2>
          <p>
            <strong>
              We do not sell, rent, trade, or otherwise disclose for value any
              data collected by the Game or the Site about any player or
              visitor.
            </strong>{" "}
            This includes IP addresses, location details, gameplay data, and
            any legal information collected for prize payment.
          </p>
        </div>

        <div>
          <h2>6. Data Sharing</h2>
          <p>
            We do not share your data with third parties, except in the
            following limited circumstances:
          </p>
          <ul>
            <li>
              <strong>Legal compliance</strong> &mdash; when required by law,
              regulation, subpoena, or court order (including tax reporting for
              prize winners);
            </li>
            <li>
              <strong>Safety and security</strong> &mdash; to investigate
              fraud, cheating, or threats to the Site, the Game, or other
              users;
            </li>
            <li>
              <strong>Service providers</strong> &mdash; if we use hosting or
              infrastructure providers to operate the Site, they may process
              technical data (such as IP addresses) on our behalf, and only for
              that purpose.
            </li>
          </ul>
        </div>

        <div>
          <h2>7. Data Retention</h2>
          <ul>
            <li>
              <strong>IP addresses and location details</strong> are retained
              only as long as necessary for security, anti-fraud, and
              operational purposes.
            </li>
            <li>
              <strong>Gameplay data</strong> (scores, leaderboard entries) is
              retained while relevant to the Game&apos;s leaderboards and
              features.
            </li>
            <li>
              <strong>Prize winner legal information</strong> is retained only
              for the period required by the laws and regulations of your
              jurisdiction, and is then erased as described in Section 4.
            </li>
          </ul>
        </div>

        <div>
          <h2>8. Data Security</h2>
          <p>
            We use reasonable technical and organizational measures to protect
            the data we hold from unauthorized access, disclosure, alteration,
            or destruction. However, no method of transmission or storage is
            completely secure, and we cannot guarantee absolute security.
          </p>
        </div>

        <div>
          <h2>9. Cookies and Tracking</h2>
          <p>
            The Site may use only strictly necessary cookies or local storage
            required for the Game and Site to function (for example, saving
            game progress or session state). We do not use advertising cookies
            or third-party tracking for marketing purposes.
          </p>
        </div>

        <div>
          <h2>10. Children&apos;s Privacy</h2>
          <p>
            The Site and Game are not directed at children under 13, and we do
            not knowingly collect personal information from children. Because
            we collect no personal information during normal use, gameplay data
            is not linked to any child&apos;s identity. If you believe a child
            has provided personal information in connection with a prize,
            contact us and we will delete it.
          </p>
        </div>

        <div>
          <h2>11. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have rights regarding your
            data, including the right to:
          </p>
          <ul>
            <li>Request access to the data we hold about you;</li>
            <li>Request correction or deletion of your data;</li>
            <li>Object to or restrict certain processing.</li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, contact us through the Site. We
            will respond in accordance with the laws applicable to your
            jurisdiction.
          </p>
        </div>

        <div>
          <h2>12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Updates will
            be posted on the Site with a revised effective date. Continued use
            of the Site or Game after changes are posted constitutes acceptance
            of the updated Policy.
          </p>
        </div>

        <div>
          <h2>13. Contact</h2>
          <p>
            For questions about this Privacy Policy or how your data is
            handled, please contact the owner via the Site at{" "}
            <a
              href="https://c-defender.dev"
              className="hover:underline" style={{ color: '#059669' }}
            >
              https://c-defender.dev
            </a>
            .
          </p>
        </div>
      </section>

      <footer className="mt-12 border-t pt-6 text-center text-sm" style={{ borderColor: '#cccccc', color: '#333333' }}>
        <p>
          <Link href="/terms" className="hover:underline" style={{ color: '#059669' }}>
            Terms of Service
          </Link>{" "}
          &middot;{" "}
          <Link href="/privacy" className="hover:underline" style={{ color: '#059669' }}>
            Privacy Policy
          </Link>
        </p>
        <p className="mt-2">
          Cosmic Defender and c-defender.dev &mdash; &copy; Mark Geden. All
          Rights Reserved.
        </p>
      </footer>
    </main>
    </div>
  );
}
