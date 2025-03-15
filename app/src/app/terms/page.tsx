'use client'
import Link from 'next/link'
import { useEffect } from 'react'

export default function TermsAndConditions() {
  // Scroll to anchor if present in URL
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView()
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-[--foreground] py-32">
        <div className='mb-2'>   
            <p className="text-sm text-gray-600 mb-20">

        </p></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-6xl font-poppins font-light mb-10 text-black text-center
        ">
          Terms and Conditions
        </h1>
        
        <p className="text-sm text-gray-600 mb-8">
          Last updated: March 15, 2025
        </p>

        {/* Table of Contents */}
        <div className="bg-gray-50 p-6 mb-10 rounded-lg border border-gray-200">
          <h2 className="text-xl font-poppins font-medium mb-4">Contents</h2>
          <ul className="space-y-2">
            <li><a href="#acceptance" className="text-black hover:text-[--accent] underline">1. Acceptance of Terms</a></li>
            <li><a href="#intellectual-property" className="text-black hover:text-[--accent] underline">2. Intellectual Property Rights</a></li>
            <li><a href="#prohibited" className="text-black hover:text-[--accent] underline">3. Prohibited Activities</a></li>
            <li><a href="#privacy" className="text-black hover:text-[--accent] underline">4. Privacy and Cookies</a></li>
            <li><a href="#disclaimer" className="text-black hover:text-[--accent] underline">5. Disclaimers</a></li>
            <li><a href="#changes" className="text-black hover:text-[--accent] underline">6. Changes to Terms</a></li>
            <li><a href="#contact" className="text-black hover:text-[--accent] underline">7. Contact Information</a></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="space-y-10 text-black">
          <section id="acceptance">
            <h2 className="text-2xl font-poppins font-medium mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using the Yolk Workshop website (the "Site"), you accept and agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our Site.
            </p>
            <p>
              These Terms form an agreement between you and Yolk Workshop, a pre-incorporation project.
            </p>
          </section>

          <section id="intellectual-property">
            <h2 className="text-2xl font-poppins font-medium mb-4">2. Intellectual Property Rights</h2>
            <p className="mb-4">
              The Site and all content, features, and functionality thereof, including but not limited to all information, designs, graphics, photographs, and overall appearance, are owned by Yolk Workshop and are protected by applicable intellectual property laws.
            </p>
            <p className="mb-4">
              These Terms permit you to use the Site for your personal, non-commercial use only. You must not:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Modify copies of any materials from the Site</li>
              <li>Use any illustrations, photographs, or graphics separately from accompanying text</li>
              <li>Delete or alter any copyright, trademark, or other proprietary notices</li>
              <li>Access or use for commercial purposes any part of the Site</li>
            </ul>
          </section>

          <section id="prohibited">
            <h2 className="text-2xl font-poppins font-medium mb-4">3. Prohibited Activities</h2>
            <p className="mb-4">
              You agree not to use the Site:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>In any way that violates any applicable law or regulation</li>
              <li>To send spam or other unsolicited messages</li>
              <li>To impersonate or attempt to impersonate Yolk Workshop or any person associated with Yolk Workshop</li>
              <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Site</li>
              <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Site</li>
              <li>To introduce viruses, trojans, worms, or other material that is malicious or technologically harmful</li>
            </ul>
          </section>

          <section id="privacy">
            <h2 className="text-2xl font-poppins font-medium mb-4">4. Privacy and Cookies</h2>
            <p className="mb-4">
              <strong>4.1. Email Collection:</strong> We may collect your email address when you voluntarily provide it to us (e.g., for newsletter subscriptions or contact purposes). We will only use your email address for the specific purpose for which it was provided.
            </p>
            <p className="mb-4">
              <strong>4.2. Cookies:</strong> Our Site uses cookies only when you have explicitly approved their use. Cookies are small text files stored on your device that help improve your experience on our Site. You can control cookie settings through your browser preferences.
            </p>
            <p className="mb-4">
              <strong>4.3. Your Rights:</strong> For users in the European Economic Area (EEA), you have the following rights regarding the limited personal data we collect:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Right to withdraw consent at any time</li>
              <li>Right to access or request deletion of your email data</li>
              <li>Right to object to the processing of your data</li>
            </ul>
            <p>
              <strong>4.4. Data Security:</strong> We implement reasonable security measures to protect any personal data we collect, but no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section id="disclaimer">
            <h2 className="text-2xl font-poppins font-medium mb-4">5. Disclaimers</h2>
            <p className="mb-4">
              The Site and its content are provided on an "as is" and "as available" basis without any warranties of any kind. We do not guarantee that the Site will be secure or free from errors or viruses.
            </p>
            <p className="mb-4">
              Yolk Workshop will not be liable to you for any losses or damages, whether direct or indirect, arising from your use of, or inability to use, the Site.
            </p>
          </section>

          <section id="changes">
            <h2 className="text-2xl font-poppins font-medium mb-4">6. Changes to Terms</h2>
            <p className="mb-4">
              We may revise these Terms at any time by updating this page. If we make material changes, we will provide notice on the Site.
            </p>
            <p>
              By continuing to use the Site after any revisions become effective, you agree to be bound by the revised Terms.
            </p>
          </section>

          <section id="contact">
            <h2 className="text-2xl font-poppins font-medium mb-4">7. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div>
              <p>Email: contact@yolkworkshop.com</p>
            </div>
          </section>
        </div>
        
      </div>
    </main>
  )
}