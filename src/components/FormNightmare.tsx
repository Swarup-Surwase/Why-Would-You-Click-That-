import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FrustratingButton } from './FrustratingButton';

export const FormNightmare: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    displayName: '',
    preferredName: '',
    learningIdentity: '',
    email: '',
    password: ''
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  // Passive-aggressive validation rules
  const getValidationError = (field: string, val: string) => {
    if (!val) return 'This field has standards.';
    if (field === 'fullName' && val.length < 3) {
      return 'You entered something. Unfortunately, not the correct something.';
    }
    if (field === 'email' && !val.includes('@')) {
      return 'That format is technically valid somewhere else. But not here.';
    }
    if (field === 'password') {
      if (val.length < 8) return 'Password requires at least 8 characters.';
      if (!/\d/.test(val)) return 'Password must contain a prime number digit.';
      if (!/[!@#$%^&*]/.test(val)) return 'Password requires an ancient symbol (!@#$%^&*).';
      if (!/[A-Z]/.test(val)) return 'Password requires an uppercase letter from a lost language.';
    }
    return null;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '28px',
        border: '1px solid var(--neon-purple)',
        margin: '24px 0'
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '20px' }} className="gradient-text-purple">
          Intentionally Frustrating Registration Form
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Labels disappear upon focus, redundant name fields, and passive-aggressive validation.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {/* Redundant Field 1: Name */}
        <div>
          {/* Label disappears after typing! */}
          <label style={{ fontSize: '12px', color: 'var(--neon-purple)', fontWeight: 700, display: formData.fullName ? 'none' : 'block', marginBottom: '6px' }}>
            Full Legal Name *
          </label>
          <input
            type="text"
            placeholder={formData.fullName ? 'Label has disappeared' : 'Enter full name'}
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(10, 5, 24, 0.8)',
              border: touched.fullName && getValidationError('fullName', formData.fullName) ? '1px solid var(--warning-red)' : '1px solid var(--glass-border)',
              borderRadius: '10px',
              padding: '12px 16px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          {touched.fullName && getValidationError('fullName', formData.fullName) && (
            <p style={{ fontSize: '11px', color: 'var(--warning-red)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
              ⚠️ {getValidationError('fullName', formData.fullName)}
            </p>
          )}
        </div>

        {/* Redundant Field 2: Display Name */}
        <div>
          <label style={{ fontSize: '12px', color: 'var(--electric-blue)', fontWeight: 700, display: formData.displayName ? 'none' : 'block', marginBottom: '6px' }}>
            Public Display Name *
          </label>
          <input
            type="text"
            placeholder={formData.displayName ? 'Label has disappeared' : 'Enter display name'}
            value={formData.displayName}
            onChange={(e) => handleChange('displayName', e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(10, 5, 24, 0.8)',
              border: '1px solid var(--glass-border)',
              borderRadius: '10px',
              padding: '12px 16px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        {/* Redundant Field 3: Preferred Name */}
        <div>
          <label style={{ fontSize: '12px', color: 'var(--bright-yellow)', fontWeight: 700, display: formData.preferredName ? 'none' : 'block', marginBottom: '6px' }}>
            Preferred Persona Name
          </label>
          <input
            type="text"
            placeholder={formData.preferredName ? 'Label has disappeared' : 'Enter preferred name'}
            value={formData.preferredName}
            onChange={(e) => handleChange('preferredName', e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(10, 5, 24, 0.8)',
              border: '1px solid var(--glass-border)',
              borderRadius: '10px',
              padding: '12px 16px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        {/* Redundant Field 4: Learning Identity */}
        <div>
          <label style={{ fontSize: '12px', color: 'var(--neon-green)', fontWeight: 700, display: formData.learningIdentity ? 'none' : 'block', marginBottom: '6px' }}>
            Personal Learner Identity Tag
          </label>
          <input
            type="text"
            placeholder={formData.learningIdentity ? 'Label has disappeared' : 'e.g. Learner #48102'}
            value={formData.learningIdentity}
            onChange={(e) => handleChange('learningIdentity', e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(10, 5, 24, 0.8)',
              border: '1px solid var(--glass-border)',
              borderRadius: '10px',
              padding: '12px 16px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        {/* Email Field */}
        <div>
          <label style={{ fontSize: '12px', color: 'var(--neon-pink)', fontWeight: 700, display: formData.email ? 'none' : 'block', marginBottom: '6px' }}>
            Electronic Mail Identifier *
          </label>
          <input
            type="email"
            placeholder={formData.email ? 'Label has disappeared' : 'user@domain.xyz'}
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(10, 5, 24, 0.8)',
              border: touched.email && getValidationError('email', formData.email) ? '1px solid var(--warning-red)' : '1px solid var(--glass-border)',
              borderRadius: '10px',
              padding: '12px 16px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          {touched.email && getValidationError('email', formData.email) && (
            <p style={{ fontSize: '11px', color: 'var(--warning-red)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
              ⚠️ {getValidationError('email', formData.email)}
            </p>
          )}
        </div>

        {/* Password Requirements Step-by-Step */}
        <div>
          <label style={{ fontSize: '12px', color: 'var(--neon-orange)', fontWeight: 700, display: formData.password ? 'none' : 'block', marginBottom: '6px' }}>
            Over-engineered Secret Password *
          </label>
          <input
            type="password"
            placeholder={formData.password ? 'Label has disappeared' : '••••••••'}
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(10, 5, 24, 0.8)',
              border: '1px solid var(--glass-border)',
              borderRadius: '10px',
              padding: '12px 16px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none'
            }}
          />

          {/* Password Requirements Checklist Revealed One by One */}
          <div style={{ marginTop: '8px', fontSize: '11px', fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ color: formData.password.length >= 8 ? 'var(--neon-green)' : 'var(--text-muted)' }}>
              {formData.password.length >= 8 ? '✓' : '○'} Requirement 1: Min 8 chars
            </span>
            {formData.password.length >= 8 && (
              <span style={{ color: /\d/.test(formData.password) ? 'var(--neon-green)' : 'var(--warning-red)' }}>
                {/\d/.test(formData.password) ? '✓' : '○'} Requirement 2: Must contain a prime digit
              </span>
            )}
            {/\d/.test(formData.password) && (
              <span style={{ color: /[!@#$%^&*]/.test(formData.password) ? 'var(--neon-green)' : 'var(--warning-red)' }}>
                {/[!@#$%^&*]/.test(formData.password) ? '✓' : '○'} Requirement 3: Ancient symbol (!@#$%^&*)
              </span>
            )}
          </div>
        </div>

        {/* Submit Action */}
        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
          <FrustratingButton
            initialText="Submit Identity Documentation"
            hoverTextSequence={['Persist Form Data', 'Are You Sure?', 'Confirm Identity?']}
            onClick={() => setSubmitted(true)}
            variant="primary"
            size="lg"
            isDodging={true}
          />

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid var(--neon-green)',
                padding: '12px 18px',
                borderRadius: '10px',
                color: 'var(--neon-green)',
                fontSize: '13px',
                fontFamily: 'var(--font-mono)'
              }}
            >
              🎉 Form submitted successfully! (Technically that worked, against all odds.)
            </motion.div>
          )}
        </div>
      </form>
    </div>
  );
};
