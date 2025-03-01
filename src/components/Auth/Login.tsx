
// // components/Auth/Login.tsx
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(formData.email, formData.password);
//       navigate('/dashboard');
//     } catch (err) {
//       setError('Invalid email or password');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
//         <div>
//           <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {error && <div className="text-red-500 text-sm text-center">{error}</div>}

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Sign in
//             </button>
//           </div>

//           <div className="text-sm text-center">
//             <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
//               Don't have an account? Sign up
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     // Clear error when user starts typing
//     if (error) setError('');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
    
//     try {
//       await login(formData.email, formData.password);
//       navigate('/dashboard');
//     } catch (err: any) {
//       console.error('Login error:', err);
//       // Handle different types of errors
//       if (err.response) {
//         // Server responded with an error
//         setError(err.response.data.message || 'Invalid email or password');
//       } else if (err.request) {
//         // Request was made but no response received
//         setError('Unable to connect to server. Please try again.');
//       } else {
//         // Something else went wrong
//         setError('An error occurred. Please try again.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white min-h-screen flex items-center justify-center">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
//         <div>
//           <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
  
//           {error && (
//             <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
//               {error}
//             </div>
//           )}
  
//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white 
//                 ${isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}
//                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
//             >
//               {isLoading ? 'Signing in...' : 'Sign in'}
//             </button>
//           </div>
  
//           <div className="text-sm text-center">
//             <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
//               Don't have an account? Sign up
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
  
// };

// export default Login;



import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      // Handle different types of errors
      if (err.response) {
        // Server responded with an error
        setError(err.response.data.message || 'Invalid email or password');
      } else if (err.request) {
        // Request was made but no response received
        setError('Unable to connect to server. Please try again.');
      } else {
        // Something else went wrong
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="bg-gray-50 min-screen flex items-center justify-center" style={{ width: '100vw', height: '100vh' }}>
      {/* Login container */}
      <div className="bg-gray-100 flex rounded-2xl shadow-lg w-full max-w-4xl mx-4 p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>

          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
            <input
              className="p-2 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>
            <Link to="/signup">
              <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                Register
              </button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=crop&w=1887&q=80"
            alt="Login Illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;

