import React, { useState, useEffect } from 'react';
import { Calendar, FileText, Clock, User, Video, Heart, Activity, Plus, LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PatientInfo from './PatientInfo';
import { mockPatient } from '../mockData/mockPatient';

const PatientDashboard = () => {
  const [sessions, setSessions] = useState([{id: "1", status: "scheduled", scheduledAt: Date.now()}]);
  const [reports, setReports] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const onStartSession = (sessionId) => {
    navigate(`/patient/${sessionId}`)
  }

//   const fetchPatientData = async () => {
//     if (!user) return;

//     try {
//       const userSessions = getSessionsByUserId(user.id, 'patient');
//       const userReports = getReportsByUserId(user.id, 'patient');
//       const patientHistory = getPatientHistoryByPatientId(user.id);

//       setSessions(userSessions);
//       setReports(userReports);
//       setHistory(patientHistory);
//     } catch (error) {
//       console.error('Error fetching patient data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

  const upcomingSessions = sessions.filter(s => s.status === 'scheduled');
  const completedSessions = sessions.filter(s => s.status === 'completed');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Hello, {mockPatient?.name}
              </h1>
              <p className="text-gray-600">Your health dashboard</p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Book Consultation
              </button>
              <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700`} >
                <LogOutIcon onClick={() => {navigate("/")}}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-lg p-3">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Next Appointment</p>
                <p className="text-lg font-bold text-gray-900">
                  {upcomingSessions.length > 0 ? 'Today' : 'None'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-lg p-3">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Consultations</p>
                <p className="text-2xl font-bold text-gray-900">{completedSessions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-lg p-3">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Medical Reports</p>
                <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-lg p-3">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Health Status</p>
                <p className="text-lg font-bold text-green-600">Good</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
            </div>
            <div className="p-6">
              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.slice(0, 5).map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-blue-100 rounded-lg p-2 mr-3">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{session.doctorName}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(session.scheduledAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => onStartSession(session.id)}
                        className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Video className="w-4 h-4 mr-1" />
                        Join
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No upcoming appointments</p>
                  <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Schedule Consultation
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
            </div>
            <div className="p-6">
              {reports.length > 0 ? (
                <div className="space-y-4">
                  {reports.slice(0, 5).map((report) => (
                    <div key={report.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">Medical Report</p>
                        <p className="text-sm text-gray-600">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2 mb-3">{report.summary}</p>
                      {report.diagnosis && (
                        <div className="mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {report.diagnosis}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          {report.keyFindings.slice(0, 2).map((finding, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                            >
                              {finding}
                            </span>
                          ))}
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          View Full Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No medical reports yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {history.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Medical History</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {history.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{record.condition}</p>
                      <p className="text-sm text-gray-600">{record.diagnosis}</p>
                      <p className="text-sm text-gray-500">Treatment: {record.treatment}</p>
                      <p className="text-sm text-gray-500">Doctor: {record.doctorName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{new Date(record.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;