import React from 'react';
import PublicLayout from './PublicLayout';
import HomePage from './HomePage';
import AlertsSection from './AlertsSection';
import NewsSection from './NewsSection';
import GallerySection from './GallerySection';
import MapSection from './MapSection';
import ResourcesSection from './ResourcesSection';
import ReportSection from './ReportSection';
import ContactSection from './ContactSection';

const PublicApp: React.FC = () => {
  return (
    <PublicLayout>
      <HomePage />
      <AlertsSection />
      <NewsSection />
      <GallerySection />
      <MapSection />
      <ResourcesSection />
      <ReportSection />
      <ContactSection />
    </PublicLayout>
  );
};

export default PublicApp;