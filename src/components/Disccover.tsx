import React from 'react';

const Discover: React.FC = () => {
  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our Solutions
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Your Next Property, Seamlessly and With Confidence
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Experience property search with smart filters, secure payments, and verified listings you can trust. 
            Discover homes effortlessly while enjoying a reliable.
          </p>
        </div>

        {/* Features List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition duration-200">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
              ✓
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Smart Filters</h4>
              <p className="text-gray-600 text-sm">Find properties that match your exact criteria</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition duration-200">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold flex-shrink-0">
              ✓
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Secure Payments</h4>
              <p className="text-gray-600 text-sm">Bank-level security for all transactions</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition duration-200">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold flex-shrink-0">
              ✓
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Verified Listings</h4>
              <p className="text-gray-600 text-sm">Every property is thoroughly checked</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition duration-200">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold flex-shrink-0">
              ✓
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Trusted Process</h4>
              <p className="text-gray-600 text-sm">Reliable experience from start to finish</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;