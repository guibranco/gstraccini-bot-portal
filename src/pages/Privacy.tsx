import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingHeader from '../components/LandingHeader';
import LandingFooter from '../components/LandingFooter';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <LandingHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="flex items-center gap-4 mb-8">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">Last updated: March 1, 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 mb-4">
                GStraccini Bot ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our GitHub application and related services.
              </p>
              <p className="text-gray-600 mb-4">
                By using GStraccini Bot, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-600 mb-4">
                When you use GStraccini Bot, we collect information that helps us provide and improve our services:
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">GitHub Account Information</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>GitHub username and profile information</li>
                <li>Email address associated with your GitHub account</li>
                <li>Public profile data (name, avatar, bio)</li>
                <li>Repository access permissions you grant to our application</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Repository Data</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Repository metadata (name, description, language, visibility)</li>
                <li>Pull request and issue information</li>
                <li>Commit messages and file changes (when processing commands)</li>
                <li>Branch and tag information</li>
                <li>Workflow and action configurations</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Usage Information</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Command usage and interaction history</li>
                <li>Bot responses and automated actions performed</li>
                <li>System logs and performance data</li>
                <li>Error logs and debugging information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide and maintain our automation services</li>
                <li>Process commands and execute requested actions</li>
                <li>Improve and personalize your experience</li>
                <li>Send important notifications about service changes or updates</li>
                <li>Detect and prevent security incidents and abuse</li>
                <li>Analyze usage patterns to enhance our features</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Comply with legal obligations and enforce our terms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Sharing and Disclosure</h2>
              <p className="text-gray-600 mb-4">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">With Your Consent</h3>
              <p className="text-gray-600 mb-4">
                We may share your information when you explicitly consent to such sharing.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Service Providers</h3>
              <p className="text-gray-600 mb-4">
                We may share information with third-party service providers who assist in our operations, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Cloud hosting and infrastructure providers</li>
                <li>Analytics and monitoring services</li>
                <li>Security and fraud prevention services</li>
                <li>Customer support platforms</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Legal Requirements</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>To comply with applicable laws and regulations</li>
                <li>To respond to legal process or government requests</li>
                <li>To protect our rights, property, or safety</li>
                <li>To prevent fraud, abuse, or security incidents</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and monitoring</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure development practices and code reviews</li>
                <li>Regular backups and disaster recovery procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-600 mb-4">
                We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Account information: Until you delete your account or revoke access</li>
                <li>Command history: Up to 2 years for service improvement</li>
                <li>System logs: Up to 1 year for security and debugging purposes</li>
                <li>Analytics data: Aggregated and anonymized data may be retained indefinitely</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights and Choices</h2>
              <p className="text-gray-600 mb-4">
                You have the following rights regarding your personal information:
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Access and Portability</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Request access to your personal information</li>
                <li>Receive a copy of your data in a portable format</li>
                <li>View your command history and bot interactions</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Correction and Deletion</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal data</li>
                <li>Revoke access permissions at any time through GitHub</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Control and Preferences</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Opt-out of certain data collection practices</li>
                <li>Update your notification preferences</li>
                <li>Control which repositories the bot can access</li>
                <li>Disable specific bot features or commands</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Integrations</h2>
              <p className="text-gray-600 mb-4">
                GStraccini Bot integrates with various third-party services to provide enhanced functionality:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Code quality services (SonarCloud, Codacy, CodeClimate)</li>
                <li>Security scanning tools (Snyk, DeepSource)</li>
                <li>CI/CD platforms (AppVeyor, GitHub Actions)</li>
                <li>AI services (OpenAI, Llama, Claude)</li>
              </ul>
              <p className="text-gray-600 mt-4">
                These integrations are subject to their respective privacy policies. We recommend reviewing their policies to understand how they handle your data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Data Transfers</h2>
              <p className="text-gray-600 mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Standard contractual clauses approved by regulatory authorities</li>
                <li>Adequacy decisions by relevant data protection authorities</li>
                <li>Certification schemes and codes of conduct</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-600 mb-4">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Posting the new Privacy Policy on this page</li>
                <li>Updating the "Last updated" date</li>
                <li>Sending notifications for material changes</li>
                <li>Providing notice through our application interface</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:privacy@gstraccini-bot.com" className="text-blue-600 hover:text-blue-800">
                    privacy@gstraccini-bot.com
                  </a>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>GitHub:</strong>{' '}
                  <a 
                    href="https://github.com/guibranco/gstraccini-bot-service/issues" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Create an issue
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Documentation:</strong>{' '}
                  <a 
                    href="https://docs.bot.straccini.com/privacy" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Privacy Documentation
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}