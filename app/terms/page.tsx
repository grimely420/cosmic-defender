import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Cosmic Defender",
  description: "Terms of Service for Cosmic Defender at c-defender.dev.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 leading-relaxed text-gray-300">
      <Link href="/" className="text-emerald-400 hover:underline">
        &larr; Back to Cosmic Defender
      </Link>

      <header className="my-8 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-emerald-400">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Website: https://c-defender.dev &bull; Owner: Mark Geden
          <br />
          Effective Date: July 7, 2026 &bull; &copy; Mark Geden. All Rights
          Reserved.
        </p>
      </header>

      <section className="space-y-8 [&_h2]:mb-2 [&_h2]:border-b [&_h2]:border-emerald-900 [&_h2]:pb-1 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-emerald-400 [&_h3]:mb-1 [&_h3]:font-semibold [&_h3]:text-emerald-200 [&_strong]:text-white [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
        <div>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the website c-defender.dev (the
            &quot;Site&quot;) or playing the game Cosmic Defender (the
            &quot;Game&quot;), you (&quot;Player,&quot; &quot;Visitor,&quot; or
            &quot;you&quot;) agree to be bound by these Terms of Service
            (&quot;Terms&quot;). If you do not agree to these Terms, do not use
            the Site or the Game.
          </p>
        </div>

        <div>
          <h2>2. Ownership and Intellectual Property</h2>
          <p>
            The Game, the Site, and all related content &mdash; including but
            not limited to software, code, graphics, artwork, audio, gameplay
            mechanics, logos, and trademarks &mdash; are the exclusive property
            of Mark Geden. All rights reserved. No part of the Game or Site may
            be copied, modified, distributed, reverse-engineered, or otherwise
            used without prior written permission from the owner.
          </p>
        </div>

        <div>
          <h2>3. Data Collection and Privacy</h2>
          <h3>3.1 What We Collect</h3>
          <p>
            We collect only limited, non-personal technical information, which
            may include:
          </p>
          <ul>
            <li>Your IP address</li>
            <li>General location details derived from your IP address</li>
            <li>
              Gameplay activity on the Site and in the Game, such as scores,
              leaderboard rankings, achievements, and prize eligibility
            </li>
          </ul>
          <p className="mt-2">
            <strong>No personal information is collected</strong> beyond what
            is described above. We do not collect names, email addresses, phone
            numbers, or other personally identifying information during normal
            use of the Site or Game.
          </p>
          <h3 className="mt-4">3.2 We Do Not Sell Your Data</h3>
          <p>
            <strong>
              We do not sell, rent, trade, or otherwise disclose for value any
              data collected by the Game or the Site about any Player or
              Visitor.
            </strong>{" "}
            This applies to all data, including IP addresses, location details,
            and gameplay activity.
          </p>
          <h3 className="mt-4">3.3 Legal Information for Prize Payments</h3>
          <p>
            If you win a prize through the Game or Site, we may be required to
            collect certain legal information from you (such as your legal
            name, address, and tax identification information) solely for the
            purpose of paying out the prize and complying with applicable law.
          </p>
          <p className="mt-2">
            Any such legal information collected for prize payment:
          </p>
          <ul>
            <li>
              Will be used <strong>only</strong> for prize fulfillment and
              legal compliance;
            </li>
            <li>
              Will <strong>not</strong> be sold or shared with third parties
              except as required by law (e.g., tax reporting authorities);
            </li>
            <li>
              Will be <strong>erased</strong> in accordance with the data
              retention and deletion requirements of the jurisdiction in which
              you reside, and in accordance with applicable state and federal
              regulations governing individuals who receive prizes or winnings
              from a gaming website.
            </li>
          </ul>
        </div>

        <div>
          <h2>4. Leaderboards, Scores, and Prizes</h2>
          <ul>
            <li>
              Scores, leaderboard placements, and related gameplay statistics
              may be displayed publicly on the Site.
            </li>
            <li>
              Prizes, if offered, are subject to eligibility requirements under
              the laws of your jurisdiction. It is your responsibility to
              ensure that receiving prizes or winnings is lawful where you
              live.
            </li>
            <li>
              We reserve the right to withhold, modify, or cancel any prize
              where fraud, cheating, or violation of these Terms is suspected,
              or where payment would violate applicable law.
            </li>
            <li>
              Prize recipients are solely responsible for any taxes or
              reporting obligations arising from prizes or winnings, except
              where law requires us to report or withhold.
            </li>
          </ul>
        </div>

        <div>
          <h2>5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>
              Cheat, exploit bugs, use bots, or otherwise manipulate scores,
              leaderboards, or prize outcomes;
            </li>
            <li>
              Attempt to gain unauthorized access to the Site, the Game, or
              related systems;
            </li>
            <li>Interfere with or disrupt the operation of the Site or Game;</li>
            <li>Use the Site or Game for any unlawful purpose.</li>
          </ul>
          <p className="mt-2">
            Violation of this section may result in disqualification from
            leaderboards and prizes and termination of your access.
          </p>
        </div>

        <div>
          <h2>6. Disclaimer of Warranties</h2>
          <p>
            The Site and the Game are provided &quot;as is&quot; and &quot;as
            available,&quot; without warranties of any kind, express or
            implied, including but not limited to warranties of
            merchantability, fitness for a particular purpose, or
            non-infringement. We do not guarantee that the Site or Game will be
            uninterrupted, error-free, or secure.
          </p>
        </div>

        <div>
          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Mark Geden shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages arising out of or related to your use of the Site
            or Game, including loss of data, scores, or prize eligibility.
          </p>
        </div>

        <div>
          <h2>8. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. The updated Terms will
            be posted on the Site with a revised effective date. Continued use
            of the Site or Game after changes are posted constitutes acceptance
            of the updated Terms.
          </p>
        </div>

        <div>
          <h2>9. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the
            Site or Game at any time, with or without notice, for conduct that
            violates these Terms or is otherwise harmful to the Site, the Game,
            or other users.
          </p>
        </div>

        <div>
          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            applicable federal law and the laws of the jurisdiction of the
            owner, without regard to conflict-of-law principles. Prize payments
            and related data handling shall additionally comply with the state
            and federal regulations applicable to the recipient&apos;s
            jurisdiction.
          </p>
        </div>

        <div>
          <h2>11. Contact</h2>
          <p>
            For questions regarding these Terms, please contact the owner via
            the Site at{" "}
            <a
              href="https://c-defender.dev"
              className="text-emerald-400 hover:underline"
            >
              https://c-defender.dev
            </a>
            .
          </p>
        </div>
      </section>

      <footer className="mt-12 border-t border-emerald-900 pt-6 text-center text-sm text-gray-500">
        <p>
          <Link href="/terms" className="text-emerald-400 hover:underline">
            Terms of Service
          </Link>{" "}
          &middot;{" "}
          <Link href="/privacy" className="text-emerald-400 hover:underline">
            Privacy Policy
          </Link>
        </p>
        <p className="mt-2">
          Cosmic Defender and c-defender.dev &mdash; &copy; Mark Geden. All
          Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
