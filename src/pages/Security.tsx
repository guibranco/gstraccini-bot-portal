import React from 'react';
import { Lock, ArrowLeft, Shield, Key, AlertCircle, Eye, Server, FileCheck, Users, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingHeader from '../components/LandingHeader';
import LandingFooter from '../components/LandingFooter';

export default function SecurityPage() {
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
            <Lock className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Security</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600 mb-8">
              Security is at the core of everything we do. GStraccini Bot is designed with multiple layers of protection to ensure your code, data, and repositories remain secure.
            </p>

            <div className="grid gap-8">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="h-6 w-6 text-green-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">Data Protection</h2>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-green-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Encryption at Rest</h3>
                        <p className="text-gray-600">All data is encrypted using AES-256 encryption when stored in our databases and file systems.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-green-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Encryption in Transit</h3>
                        <p className="text-gray-600">All data transmission is protected using TLS 1.3 with perfect forward secrecy.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-green-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Regular Security Audits</h3>
                        <p className="text-gray-600">We conduct quarterly security audits and annual penetration testing by certified security professionals.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-green-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Zero-Knowledge Architecture</h3>
                        <p className="text-gray-600">We process your code without storing sensitive content permanently on our servers.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Key className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">Authentication & Authorization</h2>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">OAuth 2.0 Integration</h3>
                        <p className="text-gray-600">Secure authentication through GitHub's OAuth 2.0 with minimal required permissions.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Multi-Factor Authentication</h3>
                        <p className="text-gray-600">Support for FIDO2 WebAuthn, TOTP authenticators, and backup recovery codes.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Granular Permissions</h3>
                        <p className="text-gray-600">Fine-grained access control with repository-level permissions and role-based access.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Session Management</h3>
                        <p className="text-gray-600">Secure session handling with automatic expiration and concurrent session limits.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Server className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">Infrastructure Security</h2>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-6 border border-purple-200">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-purple-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Cloud Security</h3>
                        <p className="text-gray-600">Hosted on enterprise-grade cloud infrastructure with SOC 2 Type II compliance.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-purple-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Network Isolation</h3>
                        <p className="text-gray-600">Private networks, VPCs, and firewall rules to isolate and protect our services.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-purple-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Container Security</h3>
                        <p className="text-gray-600">Containerized applications with security scanning and runtime protection.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-purple-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Monitoring & Alerting</h3>
                        <p className="text-gray-600">24/7 security monitoring with automated threat detection and incident response.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <FileCheck className="h-6 w-6 text-indigo-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">Code Security</h2>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-indigo-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Static Code Analysis</h3>
                        <p className="text-gray-600">Automated security scanning of our codebase using industry-leading tools.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-indigo-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Dependency Scanning</h3>
                        <p className="text-gray-600">Regular vulnerability scanning of all dependencies with automated updates.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-indigo-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Secure Development</h3>
                        <p className="text-gray-600">Security-first development practices with mandatory code reviews and testing.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-indigo-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Secrets Management</h3>
                        <p className="text-gray-600">Secure storage and rotation of API keys, tokens, and other sensitive credentials.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="h-6 w-6 text-teal-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">Privacy & Compliance</h2>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-6 border border-teal-200">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-teal-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">GDPR Compliance</h3>
                        <p className="text-gray-600">Full compliance with European data protection regulations and user rights.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-teal-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Data Minimization</h3>
                        <p className="text-gray-600">We collect only the minimum data necessary to provide our services.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-teal-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Data Retention</h3>
                        <p className="text-gray-600">Clear data retention policies with automatic deletion of expired data.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-teal-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Audit Logging</h3>
                        <p className="text-gray-600">Comprehensive audit trails for all data access and processing activities.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">Vulnerability Reporting</h2>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-6 border border-orange-200">
                  <p className="text-gray-600 mb-6">
                    We take security vulnerabilities seriously and appreciate the security community's efforts to help us maintain the highest security standards. If you discover a security issue, please report it responsibly.
                  </p>
                  
                  <div className="grid gap-4 mb-6">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-orange-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Responsible Disclosure</h3>
                        <p className="text-gray-600">Please report vulnerabilities privately to allow us time to fix them before public disclosure.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-orange-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Response Timeline</h3>
                        <p className="text-gray-600">We aim to acknowledge reports within 24 hours and provide updates within 72 hours.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-orange-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Recognition</h3>
                        <p className="text-gray-600">We maintain a security hall of fame to recognize researchers who help improve our security.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="mailto:security@gstraccini-bot.com"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                    >
                      Report Vulnerability
                    </a>
                    <a 
                      href="https://github.com/guibranco/gstraccini-bot-service/security/advisories"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 border border-orange-600 text-sm font-medium rounded-md text-orange-600 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                    >
                      View Security Advisories
                    </a>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-6 w-6 text-emerald-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">Security Team</h2>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-6 border border-emerald-200">
                  <p className="text-gray-600 mb-4">
                    Our dedicated security team consists of experienced professionals who continuously monitor, assess, and improve our security posture.
                  </p>
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">24/7 Monitoring</h3>
                        <p className="text-gray-600">Round-the-clock security monitoring and incident response capabilities.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Continuous Training</h3>
                        <p className="text-gray-600">Regular security training and certification programs for all team members.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Industry Collaboration</h3>
                        <p className="text-gray-600">Active participation in security communities and threat intelligence sharing.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="h-6 w-6 text-yellow-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">Incident Response</h2>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
                  <p className="text-gray-600 mb-4">
                    We have a comprehensive incident response plan to quickly address and resolve security incidents.
                  </p>
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-yellow-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Rapid Response</h3>
                        <p className="text-gray-600">Immediate containment and mitigation procedures for security incidents.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-yellow-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Communication</h3>
                        <p className="text-gray-600">Transparent communication with affected users and stakeholders during incidents.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-yellow-600 mt-2"></span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Post-Incident Review</h3>
                        <p className="text-gray-600">Thorough analysis and improvement of security measures after each incident.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="border-t pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">Contact Security Team</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  For security-related inquiries, vulnerability reports, or urgent security matters, please contact our security team:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div className="grid gap-4">
                    <div>
                      <p className="text-gray-700 mb-2">
                        <strong>Security Email:</strong>{' '}
                        <a href="mailto:security@gstraccini-bot.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                          security@gstraccini-bot.com
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">
                        For urgent security matters, please include "URGENT" in the subject line.
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 mb-2">
                        <strong>GitHub Security:</strong>{' '}
                        <a 
                          href="https://github.com/guibranco/gstraccini-bot-service/security" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Security tab on GitHub
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">
                        Use GitHub's private vulnerability reporting feature for sensitive issues.
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 mb-2">
                        <strong>Security Documentation:</strong>{' '}
                        <a 
                          href="https://docs.gstraccini.bot/security" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Security Guidelines
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">
                        Detailed security documentation and best practices.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}