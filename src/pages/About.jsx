import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About TechHub</h1>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <p className="text-gray-600 mb-4">
            TechHub is your premier destination for the latest technology and electronics. 
            We're committed to providing high-quality products at competitive prices with 
            exceptional customer service.
          </p>
          <p className="text-gray-600">
            Founded with a passion for technology, we strive to make the latest innovations 
            accessible to everyone. Our carefully curated selection includes laptops, 
            smartphones, cameras, gaming equipment, and much more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
