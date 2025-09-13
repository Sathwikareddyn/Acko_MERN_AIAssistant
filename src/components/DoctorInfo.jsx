/**
        * Renders the patient's information.
        */
        const DoctorInfo = ({ doctor }) => (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                        {doctor.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{doctor.name}</h2>
                        <p className="text-sm text-gray-500">{doctor.department}</p>
                        <p className="text-sm text-gray-500">{doctor.age} years old, {doctor.gender}</p>
                        <p className="text-sm text-gray-500">{doctor.experience} YOE</p>
                    </div>
                </div>
            </div>
        );

        
export default DoctorInfo;