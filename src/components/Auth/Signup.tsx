// // components/Auth/Signup.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// export const Signup: React.FC = () => {
//   const navigate = useNavigate();
//   const { signup } = useAuth();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     phoneNumber: '',
//     schoolName: '',
//     standard: '',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await signup(formData);
//       navigate('/questionnaire');
//     } catch (err) {
//       setError('Signup failed. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
//         <div>
//           <h2 className="text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
//                   First Name
//                 </label>
//                 <input
//                   id="firstName"
//                   name="firstName"
//                   type="text"
//                   required
//                   className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
//                   Last Name
//                 </label>
//                 <input
//                   id="lastName"
//                   name="lastName"
//                   type="text"
//                   required
//                   className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

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

//             <div>
//               <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
//                 Phone Number
//               </label>
//               <input
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 type="tel"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">
//                 School Name
//               </label>
//               <input
//                 id="schoolName"
//                 name="schoolName"
//                 type="text"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 value={formData.schoolName}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="standard" className="block text-sm font-medium text-gray-700">
//                 Standard
//               </label>
//               <input
//                 id="standard"
//                 name="standard"
//                 type="text"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 value={formData.standard}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {error && <div className="text-red-500 text-sm">{error}</div>}

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Sign up
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // export default Signup;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// export const Signup: React.FC = () => {
//   const navigate = useNavigate();
//   const { signup } = useAuth();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     phoneNumber: '',
//     schoolName: '',
//     standard: '',
//     age: '',
//     interests: '',
//     academicPerformance: ''
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await signup(formData);
//       navigate('/questionnaire');
//     } catch (err) {
//       setError('Signup failed. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
//         <div>
//           <h2 className="text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             {/* Existing name fields */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
//                   First Name
//                 </label>
//                 <input
//                   id="firstName"
//                   name="firstName"
//                   type="text"
//                   required
//                   className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
//                   Last Name
//                 </label>
//                 <input
//                   id="lastName"
//                   name="lastName"
//                   type="text"
//                   required
//                   className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Age field */}
//             <div>
//               <label htmlFor="age" className="block text-sm font-medium text-gray-700">
//                 Age
//               </label>
//               <input
//                 id="age"
//                 name="age"
//                 type="number"
//                 required
//                 min="13"
//                 max="25"
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 value={formData.age}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Existing email and password fields */}
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

//             {/* Interests field */}
//             <div>
//               <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
//                 Interests
//               </label>
//               <textarea
//                 id="interests"
//                 name="interests"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 value={formData.interests}
//                 onChange={handleChange}
//                 placeholder="e.g., Psychology, Literature, Media Studies"
//                 rows={3}
//               />
//             </div>

//             {/* Academic Performance field */}
//             <div>
//               <label htmlFor="academicPerformance" className="block text-sm font-medium text-gray-700">
//                 Academic Performance
//               </label>
//               <input
//                 id="academicPerformance"
//                 name="academicPerformance"
//                 type="text"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 value={formData.academicPerformance}
//                 onChange={handleChange}
//                 placeholder="e.g., 88% aggregate"
//               />
//             </div>

//             {/* Existing fields */}
//             <div>
//               <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
//                 Phone Number
//               </label>
//               <input
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 type="tel"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">
//                 School Name
//               </label>
//               <input
//                 id="schoolName"
//                 name="schoolName"
//                 type="text"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 value={formData.schoolName}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="standard" className="block text-sm font-medium text-gray-700">
//                 Standard
//               </label>
//               <input
//                 id="standard"
//                 name="standard"
//                 type="text"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 value={formData.standard}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {error && <div className="text-red-500 text-sm">{error}</div>}

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Sign up
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;




// export default Signup;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    schoolName: '',
    standard: '',
    age: '',
    interests: '',
    academicPerformance: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup(formData);
      navigate('/add-marks');
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 min-screen flex items-center justify-center" style={{ width: '100vw', height: '100vh' }}>
      <div className="bg-gray-100 flex rounded-2xl shadow-lg w-full max-w-4xl mx-4 p-5 items-center">
        <div className="w-full px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Create Account</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            Please fill in the information below to create your account
          </p>

          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="p-2 rounded-xl border"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                className="p-2 rounded-xl border"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <input
              className="p-2 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              className="p-2 rounded-xl border"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              className="p-2 rounded-xl border"
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />

            <input
              className="p-2 rounded-xl border"
              type="text"
              name="schoolName"
              placeholder="School Name"
              value={formData.schoolName}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                className="p-2 rounded-xl border"
                type="text"
                name="standard"
                placeholder="Standard"
                value={formData.standard}
                onChange={handleChange}
                required
              />
              <input
                className="p-2 rounded-xl border"
                type="number"
                name="age"
                placeholder="Age"
                min="13"
                max="25"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <textarea
              className="p-2 rounded-xl border"
              name="interests"
              placeholder="Interests (e.g., Psychology, Literature, Media Studies)"
              value={formData.interests}
              onChange={handleChange}
              rows={3}
              required
            />

            <input
              className="p-2 rounded-xl border"
              type="text"
              name="academicPerformance"
              placeholder="Academic Performance (e.g., 88% aggregate)"
              value={formData.academicPerformance}
              onChange={handleChange}
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Already have an account?</p>
            <Link to="/login">
              <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                Login
              </button>
            </Link>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl h-96"
            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=crop&w=1887&q=80"
            alt="Login Illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default Signup;