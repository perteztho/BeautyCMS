import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, User, Send, Facebook, MessageCircle, Globe } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would submit to a serverless function or external service
    alert(`Message sent successfully!\n\nSubject: ${formData.subject}\n\nWe'll get back to you within 24-48 hours.`);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Emergency Hotline',
      details: ['911 (Fire, Police, Medical)', '(054) 123-4567 (MDRRMO)'],
      color: 'bg-red-600'
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['drrm@pioduran.gov.ph', 'emergency@pioduran.gov.ph'],
      color: 'bg-blue-600'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      details: ['Municipal Hall, Pio Duran', 'Albay, Philippines 4508'],
      color: 'bg-green-600'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 8:00 AM - 5:00 PM', '24/7 Emergency Response'],
      color: 'bg-purple-600'
    }
  ];

  const socialMedia = [
    {
      icon: Facebook,
      name: 'Facebook',
      handle: '@PioDuranDRRM',
      url: '#',
      color: 'bg-blue-600'
    },
    {
      icon: MessageCircle,
      name: 'Messenger',
      handle: 'Pio Duran DRRM',
      url: '#',
      color: 'bg-blue-500'
    },
    {
      icon: Globe,
      name: 'Website',
      handle: 'pioduran.gov.ph',
      url: '#',
      color: 'bg-gray-600'
    }
  ];

  const departments = [
    {
      name: 'Disaster Risk Reduction & Management Office',
      head: 'Engr. Maria Santos',
      phone: '(054) 123-4567',
      email: 'drrm@pioduran.gov.ph'
    },
    {
      name: 'Municipal Fire Station',
      head: 'Fire Chief Roberto Cruz',
      phone: '911',
      email: 'fire@pioduran.gov.ph'
    },
    {
      name: 'Rural Health Unit',
      head: 'Dr. Ana Reyes',
      phone: '(054) 123-4568',
      email: 'health@pioduran.gov.ph'
    },
    {
      name: 'Municipal Police Station',
      head: 'Police Chief Juan Dela Cruz',
      phone: '911',
      email: 'police@pioduran.gov.ph'
    }
  ];

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600">Get in touch with our disaster risk reduction and management team</p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-gray-600">{detail}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a subject</option>
                  <option value="general-inquiry">General Inquiry</option>
                  <option value="disaster-preparedness">Disaster Preparedness</option>
                  <option value="training-request">Training Request</option>
                  <option value="resource-request">Resource Request</option>
                  <option value="feedback">Feedback/Suggestions</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please provide details about your inquiry or message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Follow Us</h3>
              <div className="space-y-3">
                {socialMedia.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{social.name}</div>
                        <div className="text-sm text-gray-600">{social.handle}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Department Contacts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Department Contacts</h3>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-medium text-gray-900 mb-2">{dept.name}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <User className="w-3 h-3" />
                        <span>{dept.head}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3 h-3" />
                        <span>{dept.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-3 h-3" />
                        <span>{dept.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Office Hours & Response Times</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-800">Regular Office Hours:</span>
                  <span className="font-medium text-blue-900">8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">Emergency Response:</span>
                  <span className="font-medium text-blue-900">24/7 Available</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">Email Response:</span>
                  <span className="font-medium text-blue-900">24-48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">Phone Response:</span>
                  <span className="font-medium text-blue-900">Same day</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Our Location</h3>
          <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Municipal Hall Location</h4>
              <p className="text-gray-600 mb-2">Pio Duran, Albay, Philippines</p>
              <p className="text-sm text-gray-500">
                In a production environment, this would display an interactive map 
                showing the exact location of our office and nearby landmarks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;