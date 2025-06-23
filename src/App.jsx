import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingHero from './components/LandingHero';
import RegisterPage from './components/Auth/Register';
import LoginPage from './components/Auth/Login';
import EmailVerificationPage from './components/Auth/EmailVerificationPage';
import CreateClassroomPage from './components/Streaming/CreateClassRoom';
import Classroom from './components/Streaming/Classroom';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import TeacherDashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import TeacherRegisterPage from './components/Auth/TeacherRegister';
import StudentProfile from './components/Streaming/StudentProfile';
import CreateLiveQuiz  from './components/Dashboard/CreateLiveQuiz';
import PasswordResetRequest from './components/ForgotePassword';
import TutorialCreatePage from './components/TutorialCreatePage';
import AboutPage from './components/AboutPage'
import TutorialListPage from './components/TutorialListPage'
import TutorialDetailPage from './components/TutorialDetailPage'
import ContactPage from './components/Contact'
import StudentListPage from './components/Streaming/LiveStudentList'
import  NotFoundPage from './components/NotFound'
import {BrowserRouter} from 'react-router-dom'

export default function AppRouter() {
  return (
   // <BrowserRouter basename="/Hacksphere">    
    <Routes>
      <Route path="/" element={<LandingHero />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register-teacher" element={<TeacherRegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-email" element={<EmailVerificationPage />} />
      <Route path="/forgot-password" element={< PasswordResetRequest/>} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />


      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/student-dashboard"
       element={<ProtectedRoute  allowedRoles={['student']} >
             <StudentDashboard/>
             </ProtectedRoute>
        
        } />
      <Route path="/create-classroom" 
      element={
      <ProtectedRoute  allowedRoles={['teacher']}>
         <CreateClassroomPage/>
      </ProtectedRoute>
      
      } />
      <Route path="/create-quiz" 
      element={
      <ProtectedRoute  allowedRoles={['teacher']}>
         <CreateLiveQuiz/>
      </ProtectedRoute>
      
      } />
      <Route path="/create-tutorial" 
      element={
      <ProtectedRoute  allowedRoles={['teacher']}>
         <TutorialCreatePage/>
      </ProtectedRoute>
      
      } />
      <Route path="/classroom/:classroomId"
        element={
        <ProtectedRoute allowedRoles={['student','teacher']} >
               <Classroom/>
          </ProtectedRoute>
        } />
      <Route  path="/tutorials/:id"
        element={
        <ProtectedRoute allowedRoles={['student','teacher']} >
               <TutorialDetailPage/>
          </ProtectedRoute>
        } />
      <Route path="tutorials"
        element={
        <ProtectedRoute allowedRoles={['student','teacher']} >
               <TutorialListPage/>
          </ProtectedRoute>
        } />
      <Route path="profile"
        element={
        <ProtectedRoute allowedRoles={['student','teacher']} >
               <StudentProfile/>
          </ProtectedRoute>
        } />
      <Route path="/students"
        element={
        <ProtectedRoute allowedRoles={['teacher']} >
               <StudentListPage/>
          </ProtectedRoute>
        } />
      <Route path="*" element={<NotFoundPage />} />

     
      
    </Routes>

  //</BrowserRouter>
    
  );                        
}


// Inside <Routes> ...



// Optional: QuizResultsPage (Teacher only)
