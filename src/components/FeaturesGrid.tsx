import React from 'react';
import { 
  GitPullRequest, 
  CheckCircle2, 
  Package, 
  Code2, 
  Bug, 
  Rocket 
} from 'lucide-react';

const features = [
  {
    icon: <GitPullRequest className="h-6 w-6" />,
    title: "Automated PRs",
    description: "Auto-label pull requests based on size and impact, streamlining your review process."
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: "PR Validation",
    description: "Enforce checklist completion and maintain high-quality documentation standards."
  },
  {
    icon: <Package className="h-6 w-6" />,
    title: "NPM Workflows",
    description: "Automate distribution file generation, Prettier formatting, and dependency updates."
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: ".NET Integration",
    description: "Run linters, CSharpier, and format commands directly from pull requests."
  },
  {
    icon: <Bug className="h-6 w-6" />,
    title: "AI-Powered Issues",
    description: "Generate issue descriptions using OpenAI, Llama, or Claude for better context."
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "CI/CD Pipeline",
    description: "Seamless integration with GitHub Actions, GitVersion, and Appveyor for version control."
  }
];

export default function FeaturesGrid() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Everything you need to streamline your GitHub workflow
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 opacity-25 group-hover:opacity-100 transition-opacity blur"></div>
              <div className="relative p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-lg text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}