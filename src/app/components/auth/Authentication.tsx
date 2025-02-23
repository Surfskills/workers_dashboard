// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../components/auth/AuthContext';
// import SignInForm from './SignInForm';
// import SignUpForm from './SignUpForm';
// import { MarketplaceService } from '@/app/types/serviceTypes';

// interface LocalAuthenticationProps {
//   onAuthSuccess?: (user: { id: string; email: string }) => void;
//   redirectPath?: string;
//   selectedButton: string | null;
//   cost: number;
//   selectedService: MarketplaceService;
//   handleButtonClick: (buttonName: string) => void;
// }

// export default function AuthenticationComponent({
//   selectedService,
//   onAuthSuccess,
//   redirectPath
// }: LocalAuthenticationProps) {
//   const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgotpassword'>('signin');
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [resetEmail, setResetEmail] = useState('');
//   const [isPasswordReset, setIsPasswordReset] = useState(false);

//   const router = useRouter();
//   const { login, signup, isAuthenticated, user } = useAuth();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setError(null);
//     console.log(`Input changed: ${name} = ${value}`);
//   };

//   const handlePasswordResetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setResetEmail(e.target.value);
//     setIsPasswordReset(false);
//     console.log(`Password reset email changed: ${resetEmail}`);
//   };

//   const createService = async (userId: string) => {
//     const accessToken = localStorage.getItem('access_token');
//     if (!accessToken) {
//       setError('You are not authenticated.');
//       console.error('Access token missing. Cannot create service.');
//       return;
//     }
//     const serviceData = {
//       user_id: userId,
//       service_id: selectedService.id,
//       title: selectedService.title,
//       description: selectedService.description,
//       cost: selectedService.cost,
//       delivery_time: selectedService.deliveryTime,  // Use snake_case versions
//       support_duration: selectedService.supportDuration,
//       features: Array.isArray(selectedService.features) 
//       ? selectedService.features.join(', ') 
//       : 'Basic features included',
//       process_link: selectedService.processLink,
//       svg_image: selectedService.svgImage
//   };

//     console.log('Creating service with payload:', serviceData);

//     try {
//       const response = await fetch('https://fred-server.onrender.com/api/service/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(serviceData),
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json(); // Parse the response
//         console.error('Service creation failed with response:', errorData); // Log the full error
//         throw new Error(errorData.message || 'Failed to create service');
//       }
      
//       const result = await response.json();
//       console.log('Service created successfully:', result);
//       return result;
//     } catch (error) {
//       console.error('Error during service creation:', error);
//       setError('Failed to create service. Please try again.');
//       throw error;
//     }
//   };

//   const handleAuthSuccess = async (authUser: { id: string; email: string }) => {
//     try {
//       console.log('Authentication successful. User:', authUser);
//       await createService(authUser.id);

//       if (onAuthSuccess) {
//         onAuthSuccess(authUser);
//         return;
//       }

//       if (redirectPath) {
//         console.log('Redirecting to:', redirectPath);
//         router.push(redirectPath);
//       } else {
//         const bookingPath = `/services/${selectedService.id}/booking`;
//         console.log('Redirecting to booking page:', bookingPath);
//         router.push(bookingPath);
//       }
//     } catch (error) {
//       console.error('Error after authentication success:', error);
//       setError('Failed to create service after authentication.');
//     }
//   };

//   const handleProceedToConsult = async () => {
//     console.log('Proceeding to consult...');
//     if (isAuthenticated) {
//       console.log('User is already authenticated.');
//       if (user) {
//         console.log('Authenticated user info:', user);
//         await handleAuthSuccess(user);
//       } else {
//         console.error('Authenticated user info is missing.');
//         setError('User information is not available.');
//       }
//       return;
//     }

//     const { email, password } = formData;

//     if (!email || !password) {
//       console.error('Email or password is missing:', { email, password });
//       setError('Please enter your email and password.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = authMode === 'signup'
//         ? await signup(email, password)
//         : await login(email, password);

//       console.log('Authentication response:', response);
//       await handleAuthSuccess(response.user);
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         console.error('Authentication error:', err);
//         setError(err.message || 'An error occurred during authentication.');
//       } else {
//         console.error('Unexpected error:', err);
//         setError('An unknown error occurred.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//   const AuthOption = ({
//     isSelected,
//     onClick,
//     label,
//   }: {
//     isSelected: boolean;
//     onClick: () => void;
//     label: string;
//   }) => (
//     <div
//       onClick={() => {
//         onClick();
//         setError(null);
//       }}
//       className="flex items-center cursor-pointer space-x-2 text-sm group"
//       role="radio"
//       aria-checked={isSelected}
//       tabIndex={0}
//     >
//       <div
//         className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors
//           ${isSelected
//             ? 'bg-green-600 border-green-600'
//             : 'bg-white border-gray-300 group-hover:border-gray-400'
//           }`}
//       >
//         {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
//       </div>
//       <span className="font-medium text-gray-600">{label}</span>
//     </div>
//   );

//   return (
//     <div className="w-full max-w-4xl mx-auto">
//       <div className="mt-8 w-full flex flex-col space-y-6 md:flex-row md:space-x-8 md:space-y-0">
//         {/* Authentication Options */}
//         {!isAuthenticated && (
//           <div className="w-full flex flex-col space-y-4 md:w-1/3">
//             <AuthOption
//               isSelected={authMode === 'signin'}
//               onClick={() => setAuthMode('signin')}
//               label="I have an account"
//             />
//             <AuthOption
//               isSelected={authMode === 'signup'}
//               onClick={() => setAuthMode('signup')}
//               label="I am new here"
//             />
//           </div>
//         )}

//         <div className="w-full flex flex-col space-y-6 md:w-2/3">
//           {!isAuthenticated ? (
//             authMode === 'signin' ? (
//               <div className="w-full space-y-6">
//                 <SignInForm
//                   email={formData.email}
//                   password={formData.password}
//                   onChange={handleInputChange}
//                 />
//                 <div className="text-right">
//                   <button
//                     onClick={() => setAuthMode('forgotpassword')}
//                     className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
//                   >
//                     Forgot Password?
//                   </button>
//                 </div>
//               </div>
//             ) : authMode === 'signup' ? (
//               <SignUpForm
//                 email={formData.email}
//                 password={formData.password}
//                 onChange={handleInputChange}
//               />
//             ) : (
//               <div className="space-y-4">
//                 <div className="text-sm text-gray-600">Enter your email to reset your password:</div>
//                 <input
//                   type="email"
//                   value={resetEmail}
//                   onChange={handlePasswordResetChange}
//                   placeholder="Your email"
//                   className="w-full p-2 border border-gray-300 rounded-md text-black bg-white"
//                 />
//                 <div className="flex justify-between items-center">
//                   <button
//                     onClick={() => setAuthMode('signin')}
//                     className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
//                   >
//                     Back to Sign In
//                   </button>
//                 </div>
//               </div>
//             )
//           ) : (
//             <></>
//           )}

//           {isPasswordReset && (
//             <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-600 text-sm">
//               A password reset link has been sent to your email.
//             </div>
//           )}

//           {error && (
//             <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
//               {error}
//             </div>
//           )}

//           {/* Proceed Button */}
//           <div className="flex justify-end">
//             <button
//               onClick={handleProceedToConsult}
//               disabled={
//                 loading ||
//                 (!isAuthenticated &&
//                   (authMode !== 'forgotpassword' && (!formData.email || !formData.password))
//                 )
//               }
//               className={`bg-green-600 text-white py-2.5 px-4 rounded-md 
//                       hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2
//                       transition-colors text-sm font-medium
//                       ${loading ||
//                   (!isAuthenticated &&
//                     (authMode !== 'forgotpassword' && (!formData.email || !formData.password))
//                   )
//                   ? 'opacity-50 cursor-not-allowed'
//                   : ''
//                 }`}
//             >
//               {loading ? (
//                 <>
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     />
//                   </svg>
//                   Processing...
//                 </>
//               ) : (
//                 authMode === 'forgotpassword' ? 'Send Reset Link' :
//                   isAuthenticated ? 'Proceed to request this service' :
//                     `Proceed to ${authMode === 'signup' ? 'sign up' : 'sign in'}`
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
