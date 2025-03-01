// // pages/Questionnaire.tsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import ProgressBar from '../components/Questionnaire/ProgressBar';
// import Question from '../components/Questionnaire/Question';
// import { Question as QuestionType, QuestionResponse } from '../types/types';

// const Questionnaire: React.FC = () => {
//   const navigate = useNavigate();
//   useAuth();
//   const [questions, setQuestions] = useState<QuestionType[]>([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState<QuestionResponse[]>([]);

//   // Mock questions data (replace with your 50 questions)
//   const mockQuestions: QuestionType[] = [
//     {
//       id: 1,
//       text: "Which of these school subjects do you like the most?",
//       type: 'radio',
//       options: ['Math', 'Science', 'English/Reading', 'History/Social Studies', 'Art/Music', 'None specifically'],
//       required: true,
//     },
//     {
//       id: 2,
//       text: "When you learn something new in class, how quickly do you usually understand it?",
//       type: 'radio',
//       options: ['Very quickly', 'Pretty quickly', 'At a normal pace', 'I need extra time to understand'],
//       required: true,
//     },
//     {
//       id: 3,
//       text: "When you have a difficult problem to solve, what do you usually do?",
//       type: 'radio',
//       options: [
//         'Break it into smaller parts and solve each one',
//         'Try out different ideas from the start',
//         'Ask someone to help me find the answer',
//         'Take time to understand and start'
//       ],
//       required: true,
//     },
//     {
//       id: 4,
//       text: "Which of these activities help you learn best?",
//       type: 'checkbox',
//       options: [
//         'Reading books',
//         'Watching videos',
//         'Discussing with friends',
//         'Doing projects with your hands',
//         'Doing research yourself',
//         'Looking at pictures and diagrams'
//       ],
//       required: true,
//     },
//     {
//       id: 5,
//       text: "Over the past few years, how have your school grades been?",
//       type: 'radio',
//       options: [
//         'They have been getting better',
//         'They have stayed about the same',
//         'They have gone down a little',
//         'They have changed a lot'
//       ],
//       required: true,
//     },
//     {
//       id: 6,
//       text: "Over the past few years, how have your school grades been?",
//       type: 'radio',
//       options: [
//         'They have been getting better',
//         'They have stayed about the same',
//         'They have gone down a little',
//         'They have changed a lot'
//       ],
//       required: true,
//     },
//     {
//       id: 7,
//       text: "In class, do you prefer...",
//       type: 'radio',
//       options: [
//         'Listening to lectures',
//         'Participating in discussions',
//         'Working on projects',
//         'Doing individual tasks'
//       ],
//       required: true,
//     },
//     {
//       id: 8,
//       text: "When you have to understand something new, how do you like to do it?",
//       type: 'radio',
//       options: [
//         'By asking a lot of questions',
//         'By thinking about it quietly by myself',
//         'By watching someone else do it',
//         'By trying it out right away'
//       ],
//       required: true,
//     },

//     // Section 2: Activities and Hobbies
//     {
//       id: 9,
//       text: "Which sports do you play?",
//       type: 'checkbox',
//       options: [
//         'Football/Soccer',
//         'Basketball',
//         'Cricket',
//         'Swimming',
//         'Running/Track',
//         'Other (Please write: ______)',
//         'None'
//       ],
//       required: true,
//     },
//     {
//       id: 10,
//       text: "Have you ever led a group or a team at school, in a club, or in sports? If yes, tell us about what you did.",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 11,
//       text: "What kind of school clubs are you a part of?",
//       type: 'checkbox',
//       options: [
//         'Tech/Robot Club',
//         'Debate Club',
//         'Drama/Acting Club',
//         'Art/Music Club',
//         'Helping others/Social Service Club',
//         'Book/Reading Club',
//         'Other (Please write: ______)',
//         'None'
//       ],
//       required: true,
//     },
//     {
//       id: 12,
//       text: "Have you done any work to help your community? If yes, please describe.",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 13,
//       text: "Have you ever won any awards or been recognized for something you did at school or outside? Any online certificates or competitions? Please tell us",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 14,
//       text: "Do you do any of these creative things?",
//       type: 'checkbox',
//       options: [
//         'Drawing/Painting',
//         'Playing an instrument',
//         'Writing stories or poems',
//         'Acting/Drama',
//         'Digital Art',
//         'None of these'
//       ],
//       required: false,
//     },
//     {
//       id: 15,
//       text: "Do you like being the one who plans and organizes events or activities?",
//       type: 'radio',
//       options: [
//         'Yes, I like planning things',
//         'I don\'t mind planning if needed',
//         'I prefer that someone else does it'
//       ],
//       required: true,
//     },
//     {
//       id: 16,
//       text: "When you are not studying or at school, what do you usually do?",
//       type: 'checkbox',
//       options: [
//         'play sports',
//         'watch TV/movies',
//         'play video games',
//         'Read books',
//         'spend time with friends',
//         'None of the above'
//       ],
//       required: false,
//     },

//     // Section 3: You as a Person
//     {
//       id: 17,
//       text: "Do you prefer to work by yourself or with a group of people?",
//       type: 'radio',
//       options: [
//         'I like to work by myself a lot',
//         'I like to work by myself',
//         'I am fine with both',
//         'I like to work with others',
//         'I like to work with others a lot'
//       ],
//       required: true,
//     },
//     {
//       id: 18,
//       text: "When faced with something new, what do you do?",
//       type: 'radio',
//       options: [
//         'I try new things right away',
//         'I\'m okay trying after some planning',
//         'I like to do things I know',
//         'I don\'t like trying new things'
//       ],
//       required: true,
//     },
//     {
//       id: 19,
//       text: "When doing a project in a group, what do you usually do?",
//       type: 'radio',
//       options: [
//         'Share new ideas',
//         'Do my part alone',
//         'Help everyone talk about what to do',
//         'Help others stay on task',
//         'I am happy to do any task'
//       ],
//       required: true,
//     },
//     {
//       id: 20,
//       text: "How do you usually get your work done?",
//       type: 'radio',
//       options: [
//         'I finish well before it\'s due',
//         'I finish before deadline',
//         'I sometimes finish late',
//         'I usually finish late'
//       ],
//       required: true,
//     },
//     {
//       id: 21,
//       text: "When you have to make a decision, what do you do?",
//       type: 'radio',
//       options: [
//         'I decide quickly',
//         'I consider all sides before choosing',
//         'I ask for advice before deciding',
//         'I struggle to make a decision'
//       ],
//       required: true,
//     },
//     {
//       id: 22,
//       text: "How organized are you usually?",
//       type: 'radio',
//       options: [
//         'I am very organized',
//         'I am somewhat organized',
//         'I am not very organized',
//         'I am very disorganized'
//       ],
//       required: true,
//     },
//     {
//       id: 23,
//       text: "When you feel stressed or worried, how do you usually handle it?",
//       type: 'radio',
//       options: [
//         'I like to tackle it',
//         'I do something else to distract myself',
//         'I ask someone for help',
//         'I avoid dealing with it.'
//       ],
//       required: true,
//     },
//     {
//       id: 24,
//       text: "Do you enjoy helping others?",
//       type: 'radio',
//       options: [
//         'Yes, I enjoy it a lot',
//         'Yes, I am okay with helping',
//         'I don\'t enjoy it'
//       ],
//       required: true,
//     },
//     {
//       id: 25,
//       text: "When you make a mistake what do you usually do?",
//       type: 'radio',
//       options: [
//         'I try to learn from it',
//         'I try to ignore it',
//         'I ask others for help',
//         'I am bothered by it'
//       ],
//       required: true,
//     },

//     // Section 4: Your Future and Technology
//     {
//       id: 26,
//       text: "Which of these jobs are you interested in?",
//       type: 'checkbox',
//       options: [
//         'Doctor/Nurse',
//         'Engineer',
//         'Computer/Tech Job',
//         'Business/Accounting',
//         'Artist/Designer',
//         'Lawyer',
//         'Teacher',
//         'Scientist',
//         'I am not sure'
//       ],
//       required: true,
//     },
//     {
//       id: 27,
//       text: "Describe, what kind of job you would like to have in detail.",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 28,
//       text: "How comfortable are you with using computers and other technology?",
//       type: 'radio',
//       options: [
//         'I\'m very comfortable',
//         'I\'m comfortable',
//         'I\'m somewhat comfortable',
//         'I am not very comfortable'
//       ],
//       required: true,
//     },
//     {
//       id: 29,
//       text: "Which of the following do you find interesting?",
//       type: 'checkbox',
//       options: [
//         'AI/Smart tech',
//         'Building websites',
//         'Creating digital art',
//         'Analysing data/information',
//         'Game design',
//         'Designing/working with robots',
//         'Cloud/Online services',
//         'Security software/cybersecurity',
//         'None'
//       ],
//       required: true,
//     },
//     {
//       id: 30,
//       text: "Do you have an online profile or work that shows what you are good at or what you love doing? If so, tell us about it!",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 31,
//       text: "How quickly do you learn new things about technology?",
//       type: 'radio',
//       options: ['Very quickly', 'Quite quickly', 'Average', 'Slowly'],
//       required: true,
//     },
//     {
//       id: 32,
//       text: "Do you prefer to work in an office, outdoors, or in a different setting?",
//       type: 'textarea',
//       required: false,
//     },

//     // Section 5: Thinking Skills
//     {
//       id: 33,
//       text: "Do you enjoy solving puzzles or riddles?",
//       type: 'radio',
//       options: ['Yes, a lot', 'Yes, sometimes', 'Not really', 'I dislike them.'],
//       required: true,
//     },
//     {
//       id: 34,
//       text: "Are you good at noticing patterns in things?",
//       type: 'radio',
//       options: ['Yes, very good', 'Yes, somewhat', 'I don\'t notice them', 'No.'],
//       required: true,
//     },
//     {
//       id: 35,
//       text: "How well do you usually remember things?",
//       type: 'radio',
//       options: [
//         'I remember a lot easily',
//         'I remember things well',
//         'I remember things only if they are important',
//         'I find it hard to remember'
//       ],
//       required: true,
//     },
//     {
//       id: 36,
//       text: "When you solve a problem do you tend to..",
//       type: 'radio',
//       options: [
//         'Use a traditional method',
//         'Try different approaches',
//         'Give up',
//         'ask others for solutions'
//       ],
//       required: true,
//     },

//     // Section 6: Social skills
//     {
//       id: 37,
//       text: "How comfortable are you talking to people you've just met?",
//       type: 'radio',
//       options: ['Very comfortable', 'Somewhat comfortable', 'Not very comfortable', 'Uncomfortable'],
//       required: true,
//     },
//     {
//       id: 38,
//       text: "How easy is it for you to work with other people?",
//       type: 'radio',
//       options: ['Very easy', 'Somewhat easy', 'Not very easy', 'Difficult'],
//       required: true,
//     },
//     {
//       id: 39,
//       text: "How easy is it for you to make friends?",
//       type: 'radio',
//       options: [
//         'I make friends easily',
//         'I make friends normally',
//         'I find it hard to make friends',
//         'I dislike making new friends'
//       ],
//       required: true,
//     },
//     {
//       id: 40,
//       text: "Are you comfortable sharing your ideas with others?",
//       type: 'radio',
//       options: [
//         'yes, I enjoy sharing ideas.',
//         'Yes, I am ok with sharing',
//         'I am uncomfortable sharing',
//         'I don\'t like sharing ideas.'
//       ],
//       required: true,
//     },

//     // Section 7: Personal Preferences
//     {
//       id: 41,
//       text: "Do you prefer working on your own or with others?",
//       type: 'radio',
//       options: [
//         'I strongly prefer working alone.',
//         'I prefer working alone',
//         'I like both the same',
//         'I prefer working with others',
//         'I strongly prefer working with others'
//       ],
//       required: true,
//     },
//     {
//       id: 42,
//       text: "Do you like following instructions?",
//       type: 'radio',
//       options: [
//         'I like to follow instructions',
//         'I like to follow instructions but sometimes want to try something different.',
//         'I prefer to do things my way.'
//       ],
//       required: true,
//     },
//     {
//       id: 43,
//       text: "Do you like to plan before doing an activity?",
//       type: 'radio',
//       options: [
//         'Yes, I like to plan everything before hand.',
//         'I prefer to plan, but sometimes I want to do things randomly',
//         'I prefer to just do things as they come.'
//       ],
//       required: true,
//     },
//     {
//       id: 44,
//       text: "How long can you focus on a particular task?",
//       type: 'radio',
//       options: [
//         'I can focus for a long time.',
//         'I can focus for a while',
//         'I get distracted easily',
//         'I am not able to focus at all'
//       ],
//       required: true,
//     },
//     {
//       id: 45,
//       text: "Do you prefer talking to others or listening to them?",
//       type: 'radio',
//       options: [
//         'I prefer talking to others',
//         'I like listening to others',
//         'I like both',
//         'I dislike both'
//       ],
//       required: true,
//     },

//     // Section 8: Personal Reflection
//     {
//       id: 46,
//       text: "What do you think are your biggest strengths?",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 47,
//       text: "What do you think you need to improve on?",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 48,
//       text: "What is your biggest fear in life?",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 49,
//       text: "What is your biggest dream in life?",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 50,
//       text: "Do you want to add anything else about yourself that we might not have asked?",
//       type: 'textarea',
//       required: false,
//     },
//   ];

//   // Fetch questions (replace with API call if needed)
//   useEffect(() => {
//     setQuestions(mockQuestions);
//     // Initialize answers with proper structure
//     const initialAnswers = mockQuestions.map((q) => ({
//       questionId: q.id,
//       answer: q.type === 'checkbox' ? [] : q.type === 'number' ? 0 : '',
//     }));
//     setAnswers(initialAnswers);
//   }, []);

//   // Handle answer input
//   const handleAnswer = (answer: string | number | string[]) => {
//     const newAnswers = [...answers];
//     newAnswers[currentQuestion] = {
//       questionId: questions[currentQuestion].id,
//       answer,
//     };
//     setAnswers(newAnswers);
//   };

//   // Navigate to the next question or submit
//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       submitAnswers();
//     }
//   };

//   // Navigate to the previous question
//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   // Submit answers to the backend
//   // E:\career-guide\src\Pages\Questionnaire.tsx
// const submitAnswers = async () => {
//   try {
//     // Get the token from wherever you store it (localStorage, context, etc.)
//     const token = localStorage.getItem('token'); // Adjust based on your auth implementation

//     const response = await fetch('/api/questionnaire/submit-answers', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}` // Ensure this matches your backend expectation
//       },
//       body: JSON.stringify({
//         answers,
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Failed to submit answers');
//     }

//     const data = await response.json();
//     console.log('Questionnaire submitted:', data);
    
//     // Show success message
//     alert('Questionnaire submitted successfully!');
    
//     // Navigate to dashboard
//     navigate('/dashboard');
//   } catch (error) {
//     console.error('Failed to submit answers:', error);
    
//     // Show error message to user
//     alert(error instanceof Error ? error.message : 'Unable to submit questionnaire. Please try again.');
//   }
// };

//   // Validate if the current question's answer is valid
//   const isAnswerValid = (answer?: QuestionResponse) => {
//     const question = questions[currentQuestion];
//     if (!question.required) return true;
//     if (!answer) return false;
//     if (question.type === 'checkbox') {
//       return (answer.answer as string[]).length > 0;
//     }
//     return answer.answer !== '' && answer.answer !== undefined;
//   };

//   // Show loading spinner if questions are not loaded
// if (!questions.length) {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002D74]" />
//     </div>
//   );
// }

// return (
//   <section className="bg-gray-50 min-screen flex items-center justify-center" style={{ width: '100vw', height: '100vh' }}>
//     <div className="bg-gray-100 flex rounded-2xl shadow-lg w-full max-w-4xl mx-4 p-5 items-center">
//       <div className="w-full px-8 md:px-16">
//         <ProgressBar current={currentQuestion + 1} total={questions.length} />

//         <br />

//         <div className="space-y-6 mt-6">
//           <div className="bg-white rounded-xl p-6 shadow-sm">
//             <Question
//               question={questions[currentQuestion]}
//               value={answers[currentQuestion]?.answer || ''}
//               onChange={handleAnswer}
//             />
//           </div>

//           <div className="flex justify-between gap-4">
//             <button
//               onClick={handlePrevious}
//               disabled={currentQuestion === 0}
//               className="w-1/2 py-2 px-4 bg-white border rounded-xl hover:scale-105 duration-300 text-[#002D74] disabled:opacity-50"
//             >
//               Previous
//             </button>

//             <button
//               onClick={handleNext}
//               disabled={!isAnswerValid(answers[currentQuestion])}
//               className="w-1/2 py-2 px-4 bg-[#002D74] text-white rounded-xl hover:scale-105 duration-300 disabled:opacity-50"
//             >
//               {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
// );
// };

// export default Questionnaire;
// pages/Questionnaire.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { Question as QuestionType, QuestionResponse } from '../types/types';

const Questionnaire: React.FC = () => {
  const navigate = useNavigate();
  useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuestionResponse[]>([]);

  // Mock questions data (replace with your 50 questions)
  const mockQuestions: QuestionType[] = [
    {
      id: 1,
      text: "Which of these school subjects do you like the most?",
      type: 'radio',
      options: ['Math', 'Science', 'English/Reading', 'History/Social Studies', 'Art/Music', 'None specifically'],
      required: true,
    },
    {
      id: 2,
      text: "When you learn something new in class, how quickly do you usually understand it?",
      type: 'radio',
      options: ['Very quickly', 'Pretty quickly', 'At a normal pace', 'I need extra time to understand'],
      required: true,
    },
    {
            id: 3,
            text: "When you have a difficult problem to solve, what do you usually do?",
            type: 'radio',
            options: [
              'Break it into smaller parts and solve each one',
              'Try out different ideas from the start',
              'Ask someone to help me find the answer',
              'Take time to understand and start'
            ],
            required: true,
          },
          {
            id: 4,
            text: "Which of these activities help you learn best?",
            type: 'checkbox',
            options: [
              'Reading books',
              'Watching videos',
              'Discussing with friends',
              'Doing projects with your hands',
              'Doing research yourself',
              'Looking at pictures and diagrams'
            ],
            required: true,
          },
          {
            id: 5,
            text: "Over the past few years, how have your school grades been?",
            type: 'radio',
            options: [
              'They have been getting better',
              'They have stayed about the same',
              'They have gone down a little',
              'They have changed a lot'
            ],
            required: true,
          },
          {
            id: 6,
            text: "Over the past few years, how have your school grades been?",
            type: 'radio',
            options: [
              'They have been getting better',
              'They have stayed about the same',
              'They have gone down a little',
              'They have changed a lot'
            ],
            required: true,
          },
          {
            id: 7,
            text: "In class, do you prefer...",
            type: 'radio',
            options: [
              'Listening to lectures',
              'Participating in discussions',
              'Working on projects',
              'Doing individual tasks'
            ],
            required: true,
          },
          {
            id: 8,
            text: "When you have to understand something new, how do you like to do it?",
            type: 'radio',
            options: [
              'By asking a lot of questions',
              'By thinking about it quietly by myself',
              'By watching someone else do it',
              'By trying it out right away'
            ],
            required: true,
          },
      
          // Section 2: Activities and Hobbies
          {
            id: 9,
            text: "Which sports do you play?",
            type: 'checkbox',
            options: [
              'Football/Soccer',
              'Basketball',
              'Cricket',
              'Swimming',
              'Running/Track',
              'Other (Please write: ______)',
              'None'
            ],
            required: true,
          },
          {
            id: 10,
            text: "Have you ever led a group or a team at school, in a club, or in sports? If yes, tell us about what you did.",
            type: 'textarea',
            required: false,
          },
          {
            id: 11,
            text: "What kind of school clubs are you a part of?",
            type: 'checkbox',
            options: [
              'Tech/Robot Club',
              'Debate Club',
              'Drama/Acting Club',
              'Art/Music Club',
              'Helping others/Social Service Club',
              'Book/Reading Club',
              'Other (Please write: ______)',
              'None'
            ],
            required: true,
          },
          {
            id: 12,
            text: "Have you done any work to help your community? If yes, please describe.",
            type: 'textarea',
            required: false,
          },
          {
            id: 13,
            text: "Have you ever won any awards or been recognized for something you did at school or outside? Any online certificates or competitions? Please tell us",
            type: 'textarea',
            required: false,
          },
          {
            id: 14,
            text: "Do you do any of these creative things?",
            type: 'checkbox',
            options: [
              'Drawing/Painting',
              'Playing an instrument',
              'Writing stories or poems',
              'Acting/Drama',
              'Digital Art',
              'None of these'
            ],
            required: false,
          },
          {
            id: 15,
            text: "Do you like being the one who plans and organizes events or activities?",
            type: 'radio',
            options: [
              'Yes, I like planning things',
              'I don\'t mind planning if needed',
              'I prefer that someone else does it'
            ],
            required: true,
          },
          {
            id: 16,
            text: "When you are not studying or at school, what do you usually do?",
            type: 'checkbox',
            options: [
              'play sports',
              'watch TV/movies',
              'play video games',
              'Read books',
              'spend time with friends',
              'None of the above'
            ],
            required: false,
          },
      
          // Section 3: You as a Person
          {
            id: 17,
            text: "Do you prefer to work by yourself or with a group of people?",
            type: 'radio',
            options: [
              'I like to work by myself a lot',
              'I like to work by myself',
              'I am fine with both',
              'I like to work with others',
              'I like to work with others a lot'
            ],
            required: true,
          },
          {
            id: 18,
            text: "When faced with something new, what do you do?",
            type: 'radio',
            options: [
              'I try new things right away',
              'I\'m okay trying after some planning',
              'I like to do things I know',
              'I don\'t like trying new things'
            ],
            required: true,
          },
          {
            id: 19,
            text: "When doing a project in a group, what do you usually do?",
            type: 'radio',
            options: [
              'Share new ideas',
              'Do my part alone',
              'Help everyone talk about what to do',
              'Help others stay on task',
              'I am happy to do any task'
            ],
            required: true,
          },
          {
            id: 20,
            text: "How do you usually get your work done?",
            type: 'radio',
            options: [
              'I finish well before it\'s due',
              'I finish before deadline',
              'I sometimes finish late',
              'I usually finish late'
            ],
            required: true,
          },
          {
            id: 21,
            text: "When you have to make a decision, what do you do?",
            type: 'radio',
            options: [
              'I decide quickly',
              'I consider all sides before choosing',
              'I ask for advice before deciding',
              'I struggle to make a decision'
            ],
            required: true,
          },
          {
            id: 22,
            text: "How organized are you usually?",
            type: 'radio',
            options: [
              'I am very organized',
              'I am somewhat organized',
              'I am not very organized',
              'I am very disorganized'
            ],
            required: true,
          },
          {
            id: 23,
            text: "When you feel stressed or worried, how do you usually handle it?",
            type: 'radio',
            options: [
              'I like to tackle it',
              'I do something else to distract myself',
              'I ask someone for help',
              'I avoid dealing with it.'
            ],
            required: true,
          },
          {
            id: 24,
            text: "Do you enjoy helping others?",
            type: 'radio',
            options: [
              'Yes, I enjoy it a lot',
              'Yes, I am okay with helping',
              'I don\'t enjoy it'
            ],
            required: true,
          },
          {
            id: 25,
            text: "When you make a mistake what do you usually do?",
            type: 'radio',
            options: [
              'I try to learn from it',
              'I try to ignore it',
              'I ask others for help',
              'I am bothered by it'
            ],
            required: true,
          },
      
          // Section 4: Your Future and Technology
          {
            id: 26,
            text: "Which of these jobs are you interested in?",
            type: 'checkbox',
            options: [
              'Doctor/Nurse',
              'Engineer',
              'Computer/Tech Job',
              'Business/Accounting',
              'Artist/Designer',
              'Lawyer',
              'Teacher',
              'Scientist',
              'I am not sure'
            ],
            required: true,
          },
          {
            id: 27,
            text: "Describe, what kind of job you would like to have in detail.",
            type: 'textarea',
            required: false,
          },
          {
            id: 28,
            text: "How comfortable are you with using computers and other technology?",
            type: 'radio',
            options: [
              'I\'m very comfortable',
              'I\'m comfortable',
              'I\'m somewhat comfortable',
              'I am not very comfortable'
            ],
            required: true,
          },
          {
            id: 29,
            text: "Which of the following do you find interesting?",
            type: 'checkbox',
            options: [
              'AI/Smart tech',
              'Building websites',
              'Creating digital art',
              'Analysing data/information',
              'Game design',
              'Designing/working with robots',
              'Cloud/Online services',
              'Security software/cybersecurity',
              'None'
            ],
            required: true,
          },
          {
            id: 30,
            text: "Do you have an online profile or work that shows what you are good at or what you love doing? If so, tell us about it!",
            type: 'textarea',
            required: false,
          },
          {
            id: 31,
            text: "How quickly do you learn new things about technology?",
            type: 'radio',
            options: ['Very quickly', 'Quite quickly', 'Average', 'Slowly'],
            required: true,
          },
          {
            id: 32,
            text: "Do you prefer to work in an office, outdoors, or in a different setting?",
            type: 'textarea',
            required: false,
          },
      
          // Section 5: Thinking Skills
          {
            id: 33,
            text: "Do you enjoy solving puzzles or riddles?",
            type: 'radio',
            options: ['Yes, a lot', 'Yes, sometimes', 'Not really', 'I dislike them.'],
            required: true,
          },
          {
            id: 34,
            text: "Are you good at noticing patterns in things?",
            type: 'radio',
            options: ['Yes, very good', 'Yes, somewhat', 'I don\'t notice them', 'No.'],
            required: true,
          },
          {
            id: 35,
            text: "How well do you usually remember things?",
            type: 'radio',
            options: [
              'I remember a lot easily',
              'I remember things well',
              'I remember things only if they are important',
              'I find it hard to remember'
            ],
            required: true,
          },
          {
            id: 36,
            text: "When you solve a problem do you tend to..",
            type: 'radio',
            options: [
              'Use a traditional method',
              'Try different approaches',
              'Give up',
              'ask others for solutions'
            ],
            required: true,
          },
      
          // Section 6: Social skills
          {
            id: 37,
            text: "How comfortable are you talking to people you've just met?",
            type: 'radio',
            options: ['Very comfortable', 'Somewhat comfortable', 'Not very comfortable', 'Uncomfortable'],
            required: true,
          },
          {
            id: 38,
            text: "How easy is it for you to work with other people?",
            type: 'radio',
            options: ['Very easy', 'Somewhat easy', 'Not very easy', 'Difficult'],
            required: true,
          },
          {
            id: 39,
            text: "How easy is it for you to make friends?",
            type: 'radio',
            options: [
              'I make friends easily',
              'I make friends normally',
              'I find it hard to make friends',
              'I dislike making new friends'
            ],
            required: true,
          },
          {
            id: 40,
            text: "Are you comfortable sharing your ideas with others?",
            type: 'radio',
            options: [
              'yes, I enjoy sharing ideas.',
              'Yes, I am ok with sharing',
              'I am uncomfortable sharing',
              'I don\'t like sharing ideas.'
            ],
            required: true,
          },
      
          // Section 7: Personal Preferences
          {
            id: 41,
            text: "Do you prefer working on your own or with others?",
            type: 'radio',
            options: [
              'I strongly prefer working alone.',
              'I prefer working alone',
              'I like both the same',
              'I prefer working with others',
              'I strongly prefer working with others'
            ],
            required: true,
          },
          {
            id: 42,
            text: "Do you like following instructions?",
            type: 'radio',
            options: [
              'I like to follow instructions',
              'I like to follow instructions but sometimes want to try something different.',
              'I prefer to do things my way.'
            ],
            required: true,
          },
          {
            id: 43,
            text: "Do you like to plan before doing an activity?",
            type: 'radio',
            options: [
              'Yes, I like to plan everything before hand.',
              'I prefer to plan, but sometimes I want to do things randomly',
              'I prefer to just do things as they come.'
            ],
            required: true,
          },
          {
            id: 44,
            text: "How long can you focus on a particular task?",
            type: 'radio',
            options: [
              'I can focus for a long time.',
              'I can focus for a while',
              'I get distracted easily',
              'I am not able to focus at all'
            ],
            required: true,
          },
          {
            id: 45,
            text: "Do you prefer talking to others or listening to them?",
            type: 'radio',
            options: [
              'I prefer talking to others',
              'I like listening to others',
              'I like both',
              'I dislike both'
            ],
            required: true,
          },
      
          // Section 8: Personal Reflection
          {
            id: 46,
            text: "What do you think are your biggest strengths?",
            type: 'textarea',
            required: false,
          },
          {
            id: 47,
            text: "What do you think you need to improve on?",
            type: 'textarea',
            required: false,
          },
          {
            id: 48,
            text: "What is your biggest fear in life?",
            type: 'textarea',
            required: false,
          },
          {
            id: 49,
            text: "What is your biggest dream in life?",
            type: 'textarea',
            required: false,
          },
          {
            id: 50,
            text: "Do you want to add anything else about yourself that we might not have asked?",
            type: 'textarea',
            required: false,
          },
        ];

  // Fetch questions (replace with API call if needed)
  // Fetch questions (replace with API call if needed)
  useEffect(() => {
    setQuestions(mockQuestions);
    // Initialize answers with proper structure
    const initialAnswers = mockQuestions.map((q) => ({
      questionId: q.id,
      answer: q.type === 'checkbox' ? [] : q.type === 'number' ? 0 : '',
    }));
    setAnswers(initialAnswers);
  }, []);

  // Handle answer input for radio buttons
  const handleRadioAnswer = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionId: questions[currentQuestion].id,
      answer: option,
    };
    setAnswers(newAnswers);
  };

  // Handle answer input for checkboxes
  const handleCheckboxAnswer = (option: string) => {
    const newAnswers = [...answers];
    const currentAnswer = newAnswers[currentQuestion].answer as string[];
    
    if (currentAnswer.includes(option)) {
      // Remove the option if already selected
      newAnswers[currentQuestion] = {
        questionId: questions[currentQuestion].id,
        answer: currentAnswer.filter(item => item !== option),
      };
    } else {
      // Add the option if not already selected
      newAnswers[currentQuestion] = {
        questionId: questions[currentQuestion].id,
        answer: [...currentAnswer, option],
      };
    }
    
    setAnswers(newAnswers);
  };

  // Handle answer input for text areas
  const handleTextAnswer = (text: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionId: questions[currentQuestion].id,
      answer: text,
    };
    setAnswers(newAnswers);
  };

  // Navigate to the next question or submit
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitAnswers();
    }
  };

  // Navigate to the previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Submit answers to the backend
  const submitAnswers = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Convert checkbox arrays to strings
      const processedAnswers = answers.map(answer => {
        if (Array.isArray(answer.answer)) {
          return {
            questionId: answer.questionId,
            answer: answer.answer.join(', ')
          };
        }
        return answer;
      });
  
      const response = await fetch('/api/questionnaire/submit-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          answers: processedAnswers,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit answers');
      }
  
      const data = await response.json();
      console.log('Questionnaire submitted:', data);
  
      // Show success message and redirect
      alert('Questionnaire submitted successfully! Redirecting to dashboard...');
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to submit answers:', error);
      alert(error instanceof Error ? error.message : 'Unable to submit questionnaire. Please try again.');
    }
  };

  // Check if an option is selected (for radio buttons)
  const isOptionSelected = (option: string): boolean => {
    const currentAnswer = answers[currentQuestion]?.answer;
    if (questions[currentQuestion]?.type === 'radio') {
      return currentAnswer === option;
    } else if (questions[currentQuestion]?.type === 'checkbox') {
      return (currentAnswer as string[])?.includes(option) || false;
    }
    return false;
  };

  // Validate if the current question's answer is valid
  const isAnswerValid = () => {
    const question = questions[currentQuestion];
    if (!question.required) return true;
    
    const answer = answers[currentQuestion];
    if (!answer) return false;
    
    if (question.type === 'checkbox') {
      return (answer.answer as string[]).length > 0;
    } else if (question.type === 'textarea') {
      return (answer.answer as string).trim() !== '';
    }
    return answer.answer !== '' && answer.answer !== undefined;
  };

  // Get the current text area value
  const getTextAreaValue = (): string => {
    return answers[currentQuestion]?.answer as string || '';
  };

  // Show loading spinner if questions are not loaded
  if (!questions.length) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  // Render the current question based on its type
  const renderQuestionContent = () => {
    const question = questions[currentQuestion];

    if (question.type === 'textarea') {
      return (
        <div className="mt-6">
          <textarea
            className="w-full min-h-32 p-4 border-2 rounded-xl transition-all duration-300 
                      focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                      bg-white shadow-sm hover:shadow resize-y text-black"
            placeholder="Type your answer here..."
            value={getTextAreaValue()}
            onChange={(e) => handleTextAnswer(e.target.value)}
            rows={6}
          />
        </div>
      );
    }

    // For radio buttons and checkboxes
    return (
      <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
        {question?.options?.map((option) => (
          <label
            key={option}
            className={`group relative flex items-center p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.01] ${
              isOptionSelected(option)
                ? 'border-indigo-500 bg-indigo-50 shadow-md'
                : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
            }`}
          >
            <div className="relative">
              {question.type === 'radio' ? (
                <>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={isOptionSelected(option)}
                    onChange={() => handleRadioAnswer(option)}
                    className="peer sr-only"
                  />
                  <div className={`h-5 w-5 rounded-full border-2 transition-all duration-300 ${
                    isOptionSelected(option)
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-300 group-hover:border-indigo-300'
                  }`}>
                    <div className={`h-2 w-2 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      isOptionSelected(option) ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`} />
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    name={`question-${question.id}`}
                    value={option}
                    checked={isOptionSelected(option)}
                    onChange={() => handleCheckboxAnswer(option)}
                    className="peer sr-only"
                  />
                  <div className={`h-5 w-5 rounded-md border-2 transition-all duration-300 ${
                    isOptionSelected(option)
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-300 group-hover:border-indigo-300'
                  }`}>
                    <div className={`h-2 w-2 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      isOptionSelected(option) ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`} />
                  </div>
                </>
              )}
            </div>
            <span className={`ml-4 text-lg transition-colors duration-300 ${
              isOptionSelected(option)
                ? 'text-indigo-900 font-medium'
                : 'text-gray-700'
            }`}>
              {option}
            </span>
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-50 p-4">
      <div className="bg-gradient-to-br from-indigo-50 to-white shadow-xl rounded-2xl overflow-hidden transition-all duration-500 transform hover:shadow-2xl w-full max-w-4xl">
        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="font-medium text-indigo-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-gray-500">
                {Math.round((currentQuestion + 1) / questions.length * 100)}% Complete
              </span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 leading-tight">
            {questions[currentQuestion].text}
          </h2>

          {renderQuestionContent()}

          {!isAnswerValid() && questions[currentQuestion].required && (
            <div className="mt-4 flex items-center text-yellow-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-2" />
              {questions[currentQuestion].type === 'textarea' 
                ? 'Please enter some text to continue' 
                : 'Please select an option to continue'}
            </div>
          )}

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`relative inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 transform ${
                currentQuestion === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-indigo-600 hover:-translate-x-1 border border-gray-200 shadow-sm hover:shadow'
              }`}
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={questions[currentQuestion].required && !isAnswerValid()}
              className={`relative inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 transform ${
                questions[currentQuestion].required && !isAnswerValid()
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800 hover:translate-x-1 shadow-md hover:shadow-lg'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;