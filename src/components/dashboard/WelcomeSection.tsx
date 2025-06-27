import type { User } from '../../types';

interface WelcomeSectionProps {
  user: User;
}

export function WelcomeSection({ user }: WelcomeSectionProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-6">
          <img
            src={user.avatar_url}
            alt="User Avatar"
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg hover:scale-105 transition-transform duration-200"
          />
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back,{' '}
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors duration-200"
              >
                {user.name}
              </a>
            </h1>
            <p className="text-blue-100 mt-1">We're glad to have you back</p>
          </div>
        </div>
      </div>
    </div>
  );
}