import React from "react";
import {
  FileText,
  ArrowLeft,
  Scale,
  Users,
  Shield,
  AlertTriangle,
  Clock,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import LandingHeader from "../components/LandingHeader";
import LandingFooter from "../components/LandingFooter";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <LandingHeader />

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="flex items-center gap-4 mb-8">
            <FileText className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Terms of Service
              </h1>
              <p className="text-gray-600">
                Legal terms and conditions for using GStraccini Bot
              </p>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">Last updated: March 1, 2025</p>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  1. Acceptance of Terms
                </h2>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <p className="text-gray-700 mb-4">
                  By accessing or using GStraccini Bot ("the Service"), you
                  agree to be bound by these Terms of Service ("Terms") and all
                  applicable laws and regulations. If you do not agree with any
                  of these terms, you are prohibited from using or accessing
                  this service.
                </p>
                <p className="text-gray-700">
                  These Terms constitute a legally binding agreement between you
                  and GStraccini Bot. Your use of the Service is also governed
                  by our Privacy Policy, which is incorporated by reference into
                  these Terms.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  2. Description of Service
                </h2>
              </div>
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <p className="text-gray-700 mb-4">
                  GStraccini Bot is a GitHub application that provides automated
                  workflow management, code quality analysis, and repository
                  maintenance services. The Service includes:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Automated pull request management and labeling</li>
                  <li>Code quality checks and analysis integration</li>
                  <li>Repository maintenance and cleanup tasks</li>
                  <li>Issue and pull request automation</li>
                  <li>Integration with third-party development tools</li>
                  <li>Command-based repository operations</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  3. Use License and Restrictions
                </h2>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  3.1 License Grant
                </h3>
                <p className="text-gray-700 mb-4">
                  Subject to these Terms, we grant you a limited, non-exclusive,
                  non-transferable, revocable license to use the Service for
                  your legitimate business or personal purposes.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  3.2 Restrictions
                </h3>
                <p className="text-gray-700 mb-4">You may not:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>
                    Modify, copy, or create derivative works of the Service
                  </li>
                  <li>
                    Use the Service for any commercial purpose without
                    authorization
                  </li>
                  <li>
                    Attempt to decompile, reverse engineer, or extract source
                    code
                  </li>
                  <li>
                    Remove any copyright, trademark, or proprietary notices
                  </li>
                  <li>
                    Use the Service to violate any applicable laws or
                    regulations
                  </li>
                  <li>
                    Interfere with or disrupt the Service or its infrastructure
                  </li>
                  <li>
                    Use the Service to transmit malicious code or harmful
                    content
                  </li>
                  <li>
                    Attempt to gain unauthorized access to other users' accounts
                    or data
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-orange-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  4. Service Availability and Modifications
                </h2>
              </div>
              <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  4.1 Service Availability
                </h3>
                <p className="text-gray-700 mb-4">
                  We strive to provide uninterrupted service, but we do not
                  guarantee that the Service will be available at all times. The
                  Service may be temporarily unavailable due to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>Scheduled maintenance and updates</li>
                  <li>Emergency repairs or security patches</li>
                  <li>Third-party service dependencies</li>
                  <li>Force majeure events beyond our control</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  4.2 Service Modifications
                </h3>
                <p className="text-gray-700">
                  We reserve the right to modify, suspend, or discontinue the
                  Service (or any part thereof) at any time, with or without
                  notice. We may also impose limits on certain features or
                  restrict access to parts of the Service.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-indigo-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  5. User Responsibilities and Conduct
                </h2>
              </div>
              <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  5.1 Account Security
                </h3>
                <p className="text-gray-700 mb-4">You are responsible for:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>
                    Maintaining the confidentiality of your GitHub account
                    credentials
                  </li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>
                    Ensuring your account information is accurate and up-to-date
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  5.2 Acceptable Use
                </h3>
                <p className="text-gray-700 mb-4">
                  You agree to use the Service in compliance with:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>
                    All applicable local, state, national, and international
                    laws
                  </li>
                  <li>GitHub's Terms of Service and Community Guidelines</li>
                  <li>These Terms and our Privacy Policy</li>
                  <li>Any additional guidelines we may publish</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  5.3 Prohibited Activities
                </h3>
                <p className="text-gray-700 mb-4">
                  You may not use the Service to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful, offensive, or illegal content</li>
                  <li>Spam, harass, or abuse other users</li>
                  <li>Distribute malware or malicious code</li>
                  <li>Attempt to circumvent security measures</li>
                  <li>Engage in any fraudulent activities</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-teal-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  6. Privacy and Data Protection
                </h2>
              </div>
              <div className="bg-teal-50 rounded-lg p-6 border border-teal-200">
                <p className="text-gray-700 mb-4">
                  Your privacy is important to us. Our collection, use, and
                  protection of your personal information is governed by our
                  Privacy Policy, which is incorporated by reference into these
                  Terms.
                </p>
                <p className="text-gray-700 mb-4">
                  By using the Service, you consent to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>
                    The collection and processing of your data as described in
                    our Privacy Policy
                  </li>
                  <li>The use of cookies and similar technologies</li>
                  <li>
                    The transfer of your data to third-party service providers
                    as necessary
                  </li>
                  <li>
                    The retention of your data for the periods specified in our
                    Privacy Policy
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-6 w-6 text-cyan-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  7. Third-Party Integrations
                </h2>
              </div>
              <div className="bg-cyan-50 rounded-lg p-6 border border-cyan-200">
                <p className="text-gray-700 mb-4">
                  The Service integrates with various third-party services and
                  platforms, including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>GitHub and GitHub API</li>
                  <li>
                    Code quality services (SonarCloud, Codacy, CodeClimate)
                  </li>
                  <li>Security scanning tools (Snyk, DeepSource)</li>
                  <li>CI/CD platforms (AppVeyor, GitHub Actions)</li>
                  <li>AI services (OpenAI, Llama, Claude)</li>
                </ul>
                <p className="text-gray-700">
                  Your use of these third-party services is subject to their
                  respective terms of service and privacy policies. We are not
                  responsible for the availability, content, or practices of
                  these third-party services.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  8. Disclaimers and Limitation of Liability
                </h2>
              </div>
              <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  8.1 Service Disclaimers
                </h3>
                <p className="text-gray-700 mb-4">
                  THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                  WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING
                  BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>
                    Warranties of merchantability, fitness for a particular
                    purpose, or non-infringement
                  </li>
                  <li>
                    Warranties that the Service will be uninterrupted,
                    error-free, or secure
                  </li>
                  <li>
                    Warranties regarding the accuracy or reliability of any
                    content
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  8.2 Limitation of Liability
                </h3>
                <p className="text-gray-700 mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE
                  FOR ANY:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>
                    Indirect, incidental, special, consequential, or punitive
                    damages
                  </li>
                  <li>
                    Loss of profits, data, use, goodwill, or other intangible
                    losses
                  </li>
                  <li>
                    Damages resulting from unauthorized access to or alteration
                    of your data
                  </li>
                  <li>Damages resulting from third-party conduct or content</li>
                  <li>
                    Damages exceeding the amount paid by you for the Service in
                    the 12 months preceding the claim
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-6 w-6 text-emerald-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  9. Indemnification
                </h2>
              </div>
              <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                <p className="text-gray-700 mb-4">
                  You agree to indemnify, defend, and hold harmless GStraccini
                  Bot, its officers, directors, employees, agents, and
                  affiliates from and against any claims, liabilities, damages,
                  losses, costs, expenses, or fees (including reasonable
                  attorneys' fees) arising from:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Your use or misuse of the Service</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any rights of another party</li>
                  <li>Your violation of any applicable laws or regulations</li>
                  <li>
                    Any content you submit, post, or transmit through the
                    Service
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-violet-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  10. Termination
                </h2>
              </div>
              <div className="bg-violet-50 rounded-lg p-6 border border-violet-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  10.1 Termination by You
                </h3>
                <p className="text-gray-700 mb-4">
                  You may terminate your use of the Service at any time by
                  uninstalling the GitHub application and ceasing to use our
                  services.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  10.2 Termination by Us
                </h3>
                <p className="text-gray-700 mb-4">
                  We may terminate or suspend your access to the Service
                  immediately, without prior notice, if you:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>Violate these Terms</li>
                  <li>Engage in prohibited activities</li>
                  <li>Pose a security risk to the Service or other users</li>
                  <li>
                    Use the Service in a manner that could damage our reputation
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  10.3 Effect of Termination
                </h3>
                <p className="text-gray-700">
                  Upon termination, your right to use the Service will cease
                  immediately. We may delete your account and all associated
                  data, though we may retain certain information as required by
                  law or for legitimate business purposes.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  11. Governing Law and Dispute Resolution
                </h2>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  11.1 Governing Law
                </h3>
                <p className="text-gray-700 mb-4">
                  These Terms shall be governed by and construed in accordance
                  with the laws of [Jurisdiction], without regard to its
                  conflict of law provisions.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  11.2 Dispute Resolution
                </h3>
                <p className="text-gray-700 mb-4">
                  Any disputes arising out of or relating to these Terms or the
                  Service shall be resolved through:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Good faith negotiations between the parties</li>
                  <li>Binding arbitration if negotiations fail</li>
                  <li>
                    The exclusive jurisdiction of courts in [Jurisdiction] for
                    any matters not subject to arbitration
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-gray-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  12. General Provisions
                </h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  12.1 Entire Agreement
                </h3>
                <p className="text-gray-700 mb-4">
                  These Terms, together with our Privacy Policy, constitute the
                  entire agreement between you and us regarding the Service.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  12.2 Severability
                </h3>
                <p className="text-gray-700 mb-4">
                  If any provision of these Terms is found to be unenforceable,
                  the remaining provisions will remain in full force and effect.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  12.3 Waiver
                </h3>
                <p className="text-gray-700 mb-4">
                  No waiver of any term or condition shall be deemed a further
                  or continuing waiver of such term or any other term.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  12.4 Assignment
                </h3>
                <p className="text-gray-700">
                  You may not assign or transfer these Terms or your rights
                  hereunder without our prior written consent. We may assign
                  these Terms without restriction.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  13. Changes to Terms
                </h2>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <p className="text-gray-700 mb-4">
                  We reserve the right to modify these Terms at any time. We
                  will notify you of any changes by:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>Posting the new Terms on this page</li>
                  <li>Updating the "Last updated" date</li>
                  <li>Sending notifications for material changes</li>
                  <li>Providing notice through our application interface</li>
                </ul>
                <p className="text-gray-700">
                  Your continued use of the Service after any such changes
                  constitutes your acceptance of the new Terms. If you do not
                  agree to the modified Terms, you must stop using the Service.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  14. Contact Information
                </h2>
              </div>
              <p className="text-gray-700 mb-6">
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="grid gap-4">
                  <div>
                    <p className="text-gray-700 mb-2">
                      <strong>Legal Email:</strong>{" "}
                      <a
                        href="mailto:legal@gstraccini-bot.com"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        legal@gstraccini-bot.com
                      </a>
                    </p>
                    <p className="text-sm text-gray-500">
                      For legal matters, terms questions, and compliance issues.
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2">
                      <strong>Support Email:</strong>{" "}
                      <a
                        href="mailto:support@gstraccini-bot.com"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        support@gstraccini-bot.com
                      </a>
                    </p>
                    <p className="text-sm text-gray-500">
                      For general support and service-related questions.
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2">
                      <strong>GitHub:</strong>{" "}
                      <a
                        href="https://github.com/guibranco/gstraccini-bot-service/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Create an issue
                      </a>
                    </p>
                    <p className="text-sm text-gray-500">
                      For technical issues and feature requests.
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2">
                      <strong>Documentation:</strong>{" "}
                      <a
                        href="https://docs.gstraccini.bot/legal/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Legal Documentation
                      </a>
                    </p>
                    <p className="text-sm text-gray-500">
                      Additional legal resources and documentation.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}
