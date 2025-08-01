import React, { useState } from 'react';
import { Phone, Mail, AlertTriangle, MapPin, Camera, Clock, User, Send, ExternalLink } from 'lucide-react';

const ReportSection: React.FC = () => {
  const [reportType, setReportType] = useState('emergency');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    incidentType: '',
    description: '',
    severity: 'medium',
    images: [] as File[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 3) // Limit to 3 images
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would submit to a serverless function or external service
    alert(`Report submitted successfully!\n\nType: ${reportType}\nIncident: ${formData.incidentType}\nLocation: ${formData.location}\n\nOur team will respond as soon as possible.`);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      incidentType: '',
      description: '',
      severity: 'medium',
      images: []
    });
  };

  const incidentTypes = [
    'Fire',
    'Flood',
    'Landslide',
    'Earthquake',
    'Medical Emergency',
    'Road Accident',
    'Infrastructure Damage',
    'Power Outage',
    'Water Shortage',
    'Other'
  ];

  return (
    <section id="report" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Report an Incident</h2>
          <p className="text-xl text-gray-600">Help us respond quickly by reporting emergencies and incidents in your area</p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-600 text-white rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">Life-Threatening Emergency?</h3>
              <p className="text-red-100">For immediate emergency response, call our hotlines directly</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-700 rounded-lg p-4 text-center">
              <Phone className="w-6 h-6 mx-auto mb-2" />
              <div className="font-bold text-lg">911</div>
              <div className="text-sm text-red-100">Fire, Police, Medical</div>
            </div>
            <div className="bg-red-700 rounded-lg p-4 text-center">
              <Phone className="w-6 h-6 mx-auto mb-2" />
              <div className="font-bold text-lg">(054) 123-4567</div>
              <div className="text-sm text-red-100">MDRRMO Hotline</div>
            </div>
            <div className="bg-red-700 rounded-lg p-4 text-center">
              <Mail className="w-6 h-6 mx-auto mb-2" />
              <div className="font-bold text-lg">Text/SMS</div>
              <div className="text-sm text-red-100">0917-123-4567</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Submit Incident Report</h3>

              {/* Report Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Report Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setReportType('emergency')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      reportType === 'emergency'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-medium">Emergency</div>
                    <div className="text-xs">Immediate response needed</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportType('incident')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      reportType === 'incident'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <Clock className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-medium">Non-Emergency</div>
                    <div className="text-xs">General incident report</div>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0917-123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Incident Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="incidentType" className="block text-sm font-medium text-gray-700 mb-2">
                      Incident Type *
                    </label>
                    <select
                      id="incidentType"
                      name="incidentType"
                      required
                      value={formData.incidentType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select incident type</option>
                      {incidentTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-2">
                      Severity Level
                    </label>
                    <select
                      id="severity"
                      name="severity"
                      value={formData.severity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low - Minor incident</option>
                      <option value="medium">Medium - Moderate concern</option>
                      <option value="high">High - Serious situation</option>
                      <option value="critical">Critical - Life threatening</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Specific address or landmark"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Incident Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Provide detailed information about the incident, including what happened, when it occurred, and any immediate dangers or concerns..."
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photos (Optional - Max 3)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload photos to help us understand the situation</p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                    >
                      Choose Photos
                    </label>
                  </div>
                  
                  {formData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {formData.images.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Report</span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information & Alternative Options */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Other Ways to Report</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Call Directly</div>
                    <div className="text-sm text-gray-600">911 or (054) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Text Message</div>
                    <div className="text-sm text-gray-600">0917-123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Facebook Messenger</div>
                    <div className="text-sm text-gray-600">@PioDuranDRRM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* External Form Option */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-3">Alternative Reporting</h3>
              <p className="text-blue-800 text-sm mb-4">
                You can also submit reports through our external Google Form for detailed incident documentation.
              </p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>Open Google Form</span>
              </button>
            </div>

            {/* Response Time Info */}
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <h3 className="text-lg font-bold text-yellow-900 mb-3">Response Times</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-yellow-800">Emergency Reports:</span>
                  <span className="font-medium text-yellow-900">5-15 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-800">Non-Emergency:</span>
                  <span className="font-medium text-yellow-900">1-4 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-800">General Inquiries:</span>
                  <span className="font-medium text-yellow-900">24-48 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportSection;