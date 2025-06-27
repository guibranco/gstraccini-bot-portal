import React from 'react';
import { Activity, ArrowLeft, CheckCircle2, AlertTriangle, XCircle, Clock, Wifi, Database, Zap, Globe, Shield, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingHeader from '../components/LandingHeader';
import LandingFooter from '../components/LandingFooter';

// Mock data for system status
const systems = [
  {
    name: 'API Gateway',
    status: 'operational',
    latency: '45ms',
    uptime: '99.99%',
    description: 'Core API endpoints and routing'
  },
  {
    name: 'GitHub Integration',
    status: 'operational',
    latency: '120ms',
    uptime: '99.95%',
    description: 'GitHub API connectivity and webhooks'
  },
  {
    name: 'Authentication Service',
    status: 'operational',
    latency: '89ms',
    uptime: '99.99%',
    description: 'OAuth and user authentication'
  },
  {
    name: 'Database Cluster',
    status: 'degraded',
    latency: '250ms',
    uptime: '99.90%',
    description: 'Primary and replica databases'
  },
  {
    name: 'Command Processing',
    status: 'operational',
    latency: '67ms',
    uptime: '99.98%',
    description: 'Bot command execution engine'
  },
  {
    name: 'Webhook Delivery',
    status: 'incident',
    latency: '450ms',
    uptime: '98.50%',
    description: 'GitHub webhook processing'
  },
  {
    name: 'Third-party Integrations',
    status: 'operational',
    latency: '180ms',
    uptime: '99.85%',
    description: 'SonarCloud, Codacy, Snyk, etc.'
  },
  {
    name: 'Notification System',
    status: 'operational',
    latency: '95ms',
    uptime: '99.97%',
    description: 'Email and in-app notifications'
  }
];

const incidents = [
  {
    date: '2025-03-01 14:23 UTC',
    title: 'Webhook Delivery Delays',
    status: 'investigating',
    severity: 'major',
    description: 'We are investigating increased latency in webhook delivery systems affecting automated responses to GitHub events.',
    updates: [
      {
        time: '14:45 UTC',
        message: 'Engineering team has identified the root cause and is implementing a fix.'
      },
      {
        time: '14:23 UTC',
        message: 'We have detected increased webhook processing times and are investigating.'
      }
    ]
  },
  {
    date: '2025-03-01 12:15 UTC',
    title: 'Database Performance Degradation',
    status: 'identified',
    severity: 'minor',
    description: 'Database performance is degraded due to increased load. Our team is working on scaling the infrastructure.',
    updates: [
      {
        time: '13:30 UTC',
        message: 'Additional database replicas have been deployed to handle the increased load.'
      },
      {
        time: '12:15 UTC',
        message: 'Monitoring systems detected elevated database response times.'
      }
    ]
  },
  {
    date: '2025-02-28 22:45 UTC',
    title: 'API Rate Limiting Issues',
    status: 'resolved',
    severity: 'minor',
    description: 'The rate limiting issues have been resolved by updating our configuration.',
    updates: [
      {
        time: '23:15 UTC',
        message: 'All systems are now operating normally. Rate limiting has been restored to expected levels.'
      },
      {
        time: '22:45 UTC',
        message: 'We identified an issue with our rate limiting configuration causing some requests to be incorrectly throttled.'
      }
    ]
  }
];

const metrics = [
  {
    name: 'Overall Uptime',
    value: '99.95%',
    period: 'Last 30 days',
    icon: <Wifi className="h-5 w-5" />,
    color: 'text-green-600'
  },
  {
    name: 'Average Response Time',
    value: '125ms',
    period: 'Last 24 hours',
    icon: <Zap className="h-5 w-5" />,
    color: 'text-blue-600'
  },
  {
    name: 'Commands Processed',
    value: '2.4M',
    period: 'Last 30 days',
    icon: <Activity className="h-5 w-5" />,
    color: 'text-purple-600'
  },
  {
    name: 'Active Repositories',
    value: '15.2K',
    period: 'Currently monitored',
    icon: <Database className="h-5 w-5" />,
    color: 'text-indigo-600'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'operational':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'degraded':
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case 'incident':
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return <Clock className="h-5 w-5 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'operational':
      return 'border-green-200 bg-green-50';
    case 'degraded':
      return 'border-yellow-200 bg-yellow-50';
    case 'incident':
      return 'border-red-200 bg-red-50';
    default:
      return 'border-gray-200 bg-gray-50';
  }
};

const getIncidentStatusBadge = (status: string) => {
  const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
  switch (status) {
    case 'investigating':
      return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Investigating</span>;
    case 'identified':
      return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Identified</span>;
    case 'monitoring':
      return <span className={`${baseClasses} bg-purple-100 text-purple-800`}>Monitoring</span>;
    case 'resolved':
      return <span className={`${baseClasses} bg-green-100 text-green-800`}>Resolved</span>;
    default:
      return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
  }
};

const getSeverityBadge = (severity: string) => {
  const baseClasses = "px-2 py-1 text-xs font-medium rounded";
  switch (severity) {
    case 'critical':
      return <span className={`${baseClasses} bg-red-100 text-red-800`}>Critical</span>;
    case 'major':
      return <span className={`${baseClasses} bg-orange-100 text-orange-800`}>Major</span>;
    case 'minor':
      return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Minor</span>;
    default:
      return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{severity}</span>;
  }
};

const getOverallStatus = () => {
  const hasIncident = systems.some(s => s.status === 'incident');
  const hasDegraded = systems.some(s => s.status === 'degraded');
  
  if (hasIncident) {
    return {
      status: 'incident',
      message: 'Some Systems Experiencing Issues',
      description: 'We are currently experiencing issues with some of our services.',
      color: 'bg-red-50 border-red-200',
      iconColor: 'text-red-500'
    };
  } else if (hasDegraded) {
    return {
      status: 'degraded',
      message: 'Partial System Outage',
      description: 'Some services are experiencing degraded performance.',
      color: 'bg-yellow-50 border-yellow-200',
      iconColor: 'text-yellow-500'
    };
  } else {
    return {
      status: 'operational',
      message: 'All Systems Operational',
      description: 'All services are running normally.',
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-500'
    };
  }
};

export default function StatusPage() {
  const overallStatus = getOverallStatus();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <LandingHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="flex items-center gap-4 mb-8">
            <Activity className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">System Status</h1>
              <p className="text-gray-600">Real-time status of GStraccini Bot services</p>
            </div>
          </div>

          {/* Overall Status */}
          <div className={`mb-12 p-6 rounded-xl border ${overallStatus.color}`}>
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full bg-white`}>
                {overallStatus.status === 'operational' && <CheckCircle2 className={`h-8 w-8 ${overallStatus.iconColor}`} />}
                {overallStatus.status === 'degraded' && <AlertTriangle className={`h-8 w-8 ${overallStatus.iconColor}`} />}
                {overallStatus.status === 'incident' && <XCircle className={`h-8 w-8 ${overallStatus.iconColor}`} />}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{overallStatus.message}</h2>
                <p className="text-gray-700">{overallStatus.description}</p>
                <p className="text-sm text-gray-500 mt-1">Last updated: March 1, 2025 15:00 UTC</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg bg-white ${metric.color}`}>
                      {metric.icon}
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-sm font-medium text-gray-700">{metric.name}</p>
                    <p className="text-xs text-gray-500">{metric.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Components */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">System Components</h2>
            <div className="grid gap-4">
              {systems.map((system, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg border ${getStatusColor(system.status)}`}
                >
                  <div className="flex items-center gap-4">
                    {getStatusIcon(system.status)}
                    <div>
                      <span className="font-medium text-gray-900">{system.name}</span>
                      <p className="text-sm text-gray-600">{system.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-right">
                    <div className="text-sm text-gray-600">
                      <div className="font-medium">Latency</div>
                      <div>{system.latency}</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="font-medium">Uptime</div>
                      <div>{system.uptime}</div>
                    </div>
                    <div className="text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        system.status === 'operational' ? 'bg-green-100 text-green-800' :
                        system.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Incidents</h2>
            <div className="space-y-6">
              {incidents.map((incident, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{incident.title}</h3>
                        {getIncidentStatusBadge(incident.status)}
                        {getSeverityBadge(incident.severity)}
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{incident.date}</p>
                      <p className="text-gray-700 mb-4">{incident.description}</p>
                    </div>
                  </div>
                  
                  {/* Incident Updates */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Updates</h4>
                    <div className="space-y-3">
                      {incident.updates.map((update, updateIndex) => (
                        <div key={updateIndex} className="flex gap-3">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                          <div>
                            <p className="text-sm text-gray-700">{update.message}</p>
                            <p className="text-xs text-gray-500">{update.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Page Information */}
          <div className="border-t border-gray-200 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Status Page Information
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>This page is updated in real-time and shows the current status of all GStraccini Bot services.</p>
                  <p>Status updates are posted automatically when incidents are detected or resolved.</p>
                  <p>For historical data and detailed metrics, visit our monitoring dashboard.</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Server className="h-5 w-5 text-blue-600" />
                  Need Help?
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Support Email</p>
                    <a href="mailto:support@gstraccini-bot.com" className="text-sm text-blue-600 hover:text-blue-800">
                      support@gstraccini-bot.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Documentation</p>
                    <a 
                      href="https://docs.bot.straccini.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      docs.bot.straccini.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">GitHub Issues</p>
                    <a 
                      href="https://github.com/guibranco/gstraccini-bot-service/issues" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Report an Issue
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}