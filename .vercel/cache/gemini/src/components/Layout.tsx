// import React from 'react';
// import { Outlet, Link, useLocation } from 'react-router-dom';
// import { Briefcase, GraduationCap, LayoutDashboard } from 'lucide-react';

// export function Layout() {
//   const location = useLocation();
  
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex">
//               <div className="flex-shrink-0 flex items-center">
//                 <GraduationCap className="h-8 w-8 text-indigo-600" />
//                 <span className="ml-2 text-xl font-bold text-gray-900">Career Guidance AI</span>
//               </div>
//               <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//                 <Link
//                   to="/questionnaire"
//                   className={`${
//                     location.pathname === '/questionnaire'
//                       ? 'border-indigo-500 text-gray-900'
//                       : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
//                   } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
//                 >
//                   <Briefcase className="h-4 w-4 mr-2" />
//                   Questionnaire
//                 </Link>
//                 <Link
//                   to="/marks"
//                   className={`${
//                     location.pathname === '/marks'
//                       ? 'border-indigo-500 text-gray-900'
//                       : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
//                   } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
//                 >
//                   <GraduationCap className="h-4 w-4 mr-2" />
//                   Marks Entry
//                 </Link>
//                 <Link
//                   to="/dashboard"
//                   className={`${
//                     location.pathname === '/dashboard'
//                       ? 'border-indigo-500 text-gray-900'
//                       : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
//                   } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
//                 >
//                   <LayoutDashboard className="h-4 w-4 mr-2" />
//                   Dashboard
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <Outlet />
//       </main>
//     </div>
//   );
// }