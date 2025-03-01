// // pages/Dashboard.tsx
// import React from 'react';
// import { useAuth } from '../context/AuthContext';

// const Dashboard: React.FC = () => {
//   const { user, logout } = useAuth();

//   return (
//     <div className="min-h-screen bg-gray-100" style={{ height:"100vh" ,width:"100vw"}}>
//       <nav className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <h1 className="text-xl font-bold text-gray-900">Career Guidance Platform</h1>
//             </div>
//             <div className="flex items-center">
//               <button
//                 onClick={logout}
//                 className="ml-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="bg-white shadow rounded-lg p-6">
//             <div className="mb-4">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Welcome, {user?.firstName} {user?.lastName}
//               </h2>
//               <p className="text-gray-600">Status: {user?.status}</p>
//             </div>

//             <div className="border-t pt-4">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Your Progress</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Test Completion</span>
//                   <span className={`px-2 py-1 rounded-full text-sm font-medium ${
//                     user?.status === 'test_done' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {user?.status === 'test_done' ? 'Completed' : 'Pending'}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Report Status</span>
//                   <span className={`px-2 py-1 rounded-full text-sm font-medium ${
//                     user?.status === 'report_generated' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {user?.status === 'report_generated' ? 'Generated' : 'Pending'}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Final Report</span>
//                   <span className={`px-2 py-1 rounded-full text-sm font-medium ${
//                     user?.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {user?.status === 'sent' ? 'Sent' : 'Pending'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };
// pages/Dashboard.tsx
// Replace your existing Dashboard component with this updated version
// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';

// const Dashboard: React.FC = () => {
//   const { user, logout } = useAuth();
//   const [status, setStatus] = useState("Pending");
//   const [reportPath, setReportPath] = useState<string | null>(null);

//   useEffect(() => {
//     const checkReportStatus = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch('/api/questionnaire/report-status', {
//           headers: { 
//             "Authorization": `Bearer ${token}`,
//           }
//         });

//         if (!response.ok) throw new Error("Failed to fetch status");
        
//         const data = await response.json();
//         setStatus(data.status);
//         setReportPath(data.reportPath);

//         // Continue polling if still analyzing
//         if (data.status === 'Analyzing') {
//           setTimeout(checkReportStatus, 10000); // Poll every 10 seconds
//         }
//       } catch (error) {
//         console.error("Error checking report status:", error);
//       }
//     };

//     checkReportStatus();
//   }, []);

//   const handleDownload = async () => {
//     if (!user || !user.firstName || !user.lastName) {
//       console.error("User details are missing.");
//       return;
//     }
  
//     // Generate the expected filename based on user name
//     const reportFilename = `${user.firstName}_${user.lastName}_Career_Report.pdf`.replace(/\s+/g, "_");
  
//     try {
//       const token = localStorage.getItem("token");
  
//       // Use the correct backend URL and change method to GET
//       const backendUrl = `http://localhost:3001/api/download-report/${reportFilename}`;
  
//       const response = await fetch(backendUrl, {
//         method: "GET",  // Change from POST to GET
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         },
//       });
  
//       if (!response.ok) throw new Error("Failed to download report");
  
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = reportFilename;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading report:", error);
//       alert("Failed to download report. Please try again.");
//     }
//   };
  
  



//   return (
//     <div className="min-h-screen bg-gray-100" style={{ height:"100vh" ,width:"100vw"}}>
//       <nav className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <h1 className="text-xl font-bold text-gray-900">Career Guidance Platform</h1>
//             </div>
//             <div className="flex items-center">
//               <button onClick={logout} className="ml-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="bg-white shadow rounded-lg p-6">
//             <div className="mb-4">
//               <h2 className="text-2xl font-bold text-gray-900">Welcome, {user?.firstName} {user?.lastName}</h2>
//               <p className="text-gray-600">Status: {status}</p>
//             </div>

//             <div className="border-t pt-4">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Your Progress</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Test Completion</span>
//                   <span className={`px-2 py-1 rounded-full text-sm font-medium ${
//                     status === "Analyzing" ? "bg-yellow-100 text-yellow-800" :
//                     status === "Successful" ? "bg-blue-100 text-blue-800" :
//                     status === "Final Report Successful" ? "bg-green-100 text-green-800" :
//                     "bg-gray-100 text-gray-800"
//                   }`}>
//                     {status}
//                   </span>
//                 </div>
//               </div>

//               {reportPath && (
//                 <div className="mt-6">
//                   <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded-md">
//                     Download Report
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Download, CheckCircle, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [status, setStatus] = useState("Pending");
  const [reportPath, setReportPath] = useState<string | null>(null);

  useEffect(() => {
    const checkReportStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('/api/questionnaire/report-status', {
          headers: { 
            "Authorization": `Bearer ${token}`,
          }
        });

        if (!response.ok) throw new Error("Failed to fetch status");
        
        const data = await response.json();
        setStatus(data.status);
        setReportPath(data.reportPath);

        // Continue polling if still analyzing
        if (data.status === 'Analyzing') {
          setTimeout(checkReportStatus, 10000); // Poll every 10 seconds
        }
      } catch (error) {
        console.error("Error checking report status:", error);
      }
    };

    checkReportStatus();
  }, []);

  const handleDownload = async () => {
    if (!user || !user.firstName || !user.lastName) {
      console.error("User details are missing.");
      return;
    }
  
    // Generate the expected filename based on user name
    const reportFilename = `${user.firstName}_${user.lastName}_Career_Report.pdf`.replace(/\s+/g, "_");
  
    try {
      const token = localStorage.getItem("token");
  
      // Use the correct backend URL and change method to GET
      const backendUrl = `http://localhost:3001/api/download-report/${reportFilename}`;
  
      const response = await fetch(backendUrl, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Failed to download report");
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = reportFilename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
      alert("Failed to download report. Please try again.");
    }
  };

  // Helper function to determine if report is available
  const isReportAvailable = status === "Final Report Successful" || status === "Successful";

  return (
    <div className="min-h-screen bg-gray-100" style={{ height: "100vh", width: "100vw" }}>
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Career Guidance Platform</h1>
            </div>
            <div className="flex items-center">
              <button onClick={logout} className="ml-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Header - Styled like the second design */}
          <div className="relative bg-gradient-to-r from-indigo-600 to-indigo-900 shadow-xl rounded-2xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
            <div className="relative p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Welcome, {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-indigo-200">Track your career assessment progress</p>
                </div>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    isReportAvailable
                      ? 'bg-green-500 text-white'
                      : status === "Analyzing"
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    {isReportAvailable ? (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Report Ready
                      </>
                    ) : status === "Analyzing" ? (
                      <>
                        <AlertCircle className="h-5 w-5 mr-2" />
                        Analyzing Results
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5 mr-2" />
                        {status}
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Assessment Status</h3>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-600">
                    Current Status
                  </p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    status === "Analyzing" ? "bg-yellow-100 text-yellow-800" :
                    status === "Successful" ? "bg-blue-100 text-blue-800" :
                    status === "Final Report Successful" ? "bg-green-100 text-green-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {status}
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-8">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      status === "Pending" ? "w-1/4 bg-gray-400" :
                      status === "Analyzing" ? "w-1/2 bg-yellow-500" :
                      status === "Successful" ? "w-3/4 bg-blue-500" :
                      "w-full bg-green-500"
                    }`}
                  />
                </div>
              </div>

              {reportPath && (
                <button 
                  onClick={handleDownload} 
                  className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Download className="h-6 w-6 mr-2" />
                  Download Career Report
                </button>
              )}

              <div className="bg-indigo-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-indigo-900 mb-2">Next Steps</h4>
                <ul className="space-y-3">
                  {!isReportAvailable && (
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-200 flex items-center justify-center">
                        <span className="text-indigo-600 text-sm font-medium">1</span>
                      </div>
                      <p className="ml-3 text-sm text-indigo-800">
                        Your assessment is being processed. Please check back soon.
                      </p>
                    </li>
                  )}
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-200 flex items-center justify-center">
                      <span className="text-indigo-600 text-sm font-medium">{isReportAvailable ? "1" : "2"}</span>
                    </div>
                    <p className="ml-3 text-sm text-indigo-800">
                      {isReportAvailable 
                        ? "Download your career assessment report using the button above"
                        : "Once your report is ready, you can download it from this dashboard"}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-200 flex items-center justify-center">
                      <span className="text-indigo-600 text-sm font-medium">{isReportAvailable ? "2" : "3"}</span>
                    </div>
                    <p className="ml-3 text-sm text-indigo-800">
                      Schedule a consultation with a career counselor for personalized guidance
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;