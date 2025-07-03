import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <p className="text-gray-600 mb-4">
            Get in touch with our team for any questions or support.
          </p>
          <div className="space-y-2">
            <p><strong>Email:</strong> support@techhub.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Tech Street, Digital City, DC 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
