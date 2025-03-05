import React, { useState } from 'react';
import { Phone, Mail, Building2, UserRound, MapPin } from 'lucide-react';
import { officialsData } from '../data/official';

const Official = () => {
  const [selectedLocation, setSelectedLocation] = useState(officialsData[0]?.location || '');

  const currentOfficials = officialsData.find(
    (data) => data.location === selectedLocation
  )?.officials || [];

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
          Government Officials Directory
        </h1>
        
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-lg border border-green-700 p-1">
            {officialsData.map((data) => (
              <button
                key={data.location}
                onClick={() => setSelectedLocation(data.location)}
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  selectedLocation === data.location
                    ? 'bg-green-700 text-white'
                    : 'text-green-700 hover:bg-green-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  {data.location}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentOfficials.map((official, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-green-700 hover:transform hover:scale-105 transition-transform duration-200"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <UserRound className="text-green-700" size={24} />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {official.name}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 size={18} className="text-green-600" />
                    <span>{official.department}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <UserRound size={18} className="text-green-600" />
                    <span>{official.designation}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={18} className="text-green-600" />
                    <a href={`tel:${official.phone}`} className="hover:text-green-700">
                      {official.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={18} className="text-green-600" />
                    <a href={`mailto:${official.email}`} className="hover:text-green-700">
                      {official.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Official;
