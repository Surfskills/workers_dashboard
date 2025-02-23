import React, { useState } from 'react';

interface AuthFormData {
  email: string;
  password: string;
}

interface AuthenticationSectionProps {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  onProceed: () => void;
  formData: AuthFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface AuthOptionProps {
  isSelected: boolean;
  onClick: () => void;
  label: string;
}

const AuthOption: React.FC<AuthOptionProps> = ({ isSelected, onClick, label }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
  >
    <div
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
        ${isSelected 
          ? 'border-green-500 bg-green-500' 
          : 'border-gray-300'
        }`}
    >
      {isSelected && (
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
      )}
    </div>
    <span className="text-gray-700 text-lg">{label}</span>
  </button>
);

interface SignInFormProps {
  email: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ email, password, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-base sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">Email</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Enter your email address"
        className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm text-gray-500 placeholder-gray-500 rounded-lg border border-gray-300 bg-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out shadow-sm"
        required
      />
    </div>
    <div>
      <label className="block text-base sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Enter your password"
        className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm text-gray-500 placeholder-gray-500 rounded-lg border border-gray-300 bg-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out shadow-sm"
        required
      />
    </div>
  </div>
);

const SignUpForm = SignInForm;

const AuthenticationSection: React.FC<AuthenticationSectionProps> = ({
  isAuthenticated,
  loading,
  error,
  onProceed,
  formData,
  onInputChange,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgotpassword'>('signin');
  const [resetEmail, setResetEmail] = useState('');
  const [isPasswordReset] = useState(false);

  const handlePasswordResetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetEmail(e.target.value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mt-8 w-full flex flex-col space-y-6 md:flex-row md:space-x-8 md:space-y-0">
        {/* Authentication Options */}
        {!isAuthenticated && (
          <div className="w-full flex flex-col space-y-4 md:w-1/3">
            <AuthOption
              isSelected={authMode === 'signin'}
              onClick={() => setAuthMode('signin')}
              label="I have an account"
            />
            <AuthOption
              isSelected={authMode === 'signup'}
              onClick={() => setAuthMode('signup')}
              label="I am new here"
            />
          </div>
        )}

        <div className="w-full flex flex-col space-y-6 md:w-2/3" data-auth-mode={authMode}>
          {!isAuthenticated ? (
            authMode === 'signin' ? (
              <div className="w-full space-y-6">
                <SignInForm
                  email={formData.email}
                  password={formData.password}
                  onChange={onInputChange}
                />
                <div className="text-right">
                  <button
                    onClick={() => setAuthMode('forgotpassword')}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
            ) : authMode === 'signup' ? (
              <SignUpForm
                email={formData.email}
                password={formData.password}
                onChange={onInputChange}
              />
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-gray-600">Enter your email to reset your password:</div>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={handlePasswordResetChange}
                  placeholder="Your email"
                  className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm text-gray-500 placeholder-gray-500 rounded-lg border border-gray-300 bg-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out shadow-sm"
                />
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setAuthMode('signin')}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Back to Sign In
                  </button>
                </div>
              </div>
            )
          ) : (
            <></>
          )}

          {isPasswordReset && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-600 text-sm">
              A password reset link has been sent to your email.
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Proceed Button */}
          <div className="flex justify-end">
            <button
              onClick={onProceed}
              disabled={
                loading ||
                (!isAuthenticated &&
                  (authMode !== 'forgotpassword' && (!formData.email || !formData.password))
                )
              }
              className={`bg-green-600 text-white py-2.5 px-4 rounded-md 
                      hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                      transition-colors text-sm font-medium
                      ${loading ||
                  (!isAuthenticated &&
                    (authMode !== 'forgotpassword' && (!formData.email || !formData.password))
                  )
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
                }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                authMode === 'forgotpassword' ? 'Send Reset Link' :
                  isAuthenticated ? 'Proceed to request this service' :
                    `Proceed to ${authMode === 'signup' ? 'sign up' : 'sign in'}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationSection; 