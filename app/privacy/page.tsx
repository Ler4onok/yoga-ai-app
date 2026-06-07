import React from "react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-8 uppercase">Privacy <span className="text-blue-600">Policy</span></h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-gray-500 mb-12">Last Updated: June 7, 2026</p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600">
              We collect information you provide directly to us when creating a yoga flow, including your yoga experience level, physical focus areas, and any physical limitations you choose to share.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600">
              The information you provide is used solely to generate a personalizado yoga sequence through our AI models. We do not sell or share your personal physical data with third parties for marketing purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. AI Data Processing</h2>
            <p className="text-gray-600">
              Input data is processed through secure AI APIs (like Google Gemini). This data is used to generate the flow and is not used to train global models in a way that identifies you personally.
            </p>
          </section>

          <section className="mb-12 border-t border-gray-100 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at privacy@yoflowai.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
