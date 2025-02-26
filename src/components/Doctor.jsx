import React from "react";
import { Link, useNavigate } from "react-router-dom";

function DoctorCard({ doctor, onViewSlots }) {
  const navigate = useNavigate()
  const {_id} = doctor
  return (
    <div className=" mr-5 mb-4 min-w-56 max-w-sm p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
      <p className="text-gray-600">{doctor.specialization}</p>
      <p className="text-gray-500 mt-2 mb-4">
        🕒 {doctor.workingHours.start} - {doctor.workingHours.end}
      </p>
      <Link to={`/availabbeSlots/${_id}`}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        View Available Slots
      </Link>
    </div>
  );
}

export default DoctorCard;
