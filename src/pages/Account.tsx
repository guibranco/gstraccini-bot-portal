import { useState } from 'react';
import { mockUser, mockInstallations } from '../mockData';
import { ProfileSection } from '../components/account/ProfileSection';
import { PasswordSection } from '../components/account/PasswordSection';
import { TwoFactorSection } from '../components/account/TwoFactorSection';
import { FIDOSection } from '../components/account/FIDOSection';
import { InstallationsSection } from '../components/account/InstallationsSection';
import type { Installation } from '../types';

export function Account() {
  const [usedRecoveryCodes] = useState<Set<string>>(new Set(['abcd-efgh-ijkl-mnop']));

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update
    console.log('Profile updated');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password update
    console.log('Password updated');
  };

  const handleToggle2FA = () => {
    // Handle 2FA toggle
    console.log('2FA toggled');
  };

  const handleRegenerateCodes = () => {
    // Handle recovery codes regeneration
    console.log('Recovery codes regenerated');
  };

  const handleRegisterFIDODevice = () => {
    // Handle new FIDO device registration
    console.log('Register new FIDO device');
  };

  const handleRemoveFIDODevice = (id: string) => {
    // Handle FIDO device removal
    console.log('FIDO device removed:', id);
  };

  const handleRemoveInstallation = (installation: Installation) => {
    // Handle installation removal
    console.log('Remove installation:', installation.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Account Settings</h1>

      <ProfileSection
        user={mockUser}
        onSubmit={handleProfileSubmit}
      />

      <PasswordSection
        hasPassword={mockUser.has_password || false}
        onSubmit={handlePasswordSubmit}
      />

      <TwoFactorSection
        has2FA={mockUser.has_2fa || false}
        recoveryCodes={mockUser.recovery_codes || []}
        usedRecoveryCodes={usedRecoveryCodes}
        onToggle2FA={handleToggle2FA}
        onRegenerateCodes={handleRegenerateCodes}
      />

      <FIDOSection
        devices={mockUser.fido_devices || []}
        onRegisterDevice={handleRegisterFIDODevice}
        onRemoveDevice={handleRemoveFIDODevice}
      />

      <InstallationsSection
        installations={mockInstallations}
        onRemoveInstallation={handleRemoveInstallation}
      />
    </div>
  );
}