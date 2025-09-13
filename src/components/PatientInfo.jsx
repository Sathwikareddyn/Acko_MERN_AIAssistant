/**
        * Renders the patient's information.
        */
        const PatientInfo = ({ patient }) => (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                        {patient.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
                        <p className="text-sm text-gray-500">{patient.age} years old, {patient.gender}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-sm font-semibold text-blue-800 mb-2">Medical History</h3>
                        <ul className="text-sm text-blue-700 list-disc list-inside">
                            {patient.medicalHistory.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                        <h3 className="text-sm font-semibold text-red-800 mb-2">Allergies</h3>
                        <ul className="text-sm text-red-700 list-disc list-inside">
                            {patient.allergies.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="text-sm font-semibold text-purple-800 mb-2">Current Symptoms</h3>
                        <ul className="text-sm text-purple-700 list-disc list-inside">
                            {patient.currentSymptoms.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-sm font-semibold text-green-800 mb-2">Medications</h3>
                        <ul className="text-sm text-green-700 list-disc list-inside">
                            {patient.medications.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        );

        
export default PatientInfo;