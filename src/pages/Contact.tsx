import React, { useState } from 'react';
import { db } from '../services/db';
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Send,
  CheckCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface ContactProps {
  onNavigate: (path: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    serviceOfInterest: 'AI & Prompt Engineering',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    db.saveMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject || `Inquiry regarding ${formData.serviceOfInterest}`,
      message: formData.message,
      serviceOfInterest: formData.serviceOfInterest,
    });

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        serviceOfInterest: 'AI & Prompt Engineering',
        message: '',
      });
    }, 400);
  };

  const whatsappUrl = `https://wa.me/2348169323996?text=Hello%20Wangarawa%20Tech%2C%20I%20would%20like%20to%20inquire%20about%20your%20training%20programmes%20and%20services.`;

  return (
    <div className="space-y-16 sm:space-y-20 py-8">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B2545] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs uppercase font-bold tracking-widest text-amber-400 font-mono">
              Official Contact & Location
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Contact Wangarawa Tech
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              We welcome students, schools, local businesses and partners to visit our technology centre in Sabuwar Takur, Dutse or reach out directly through our verified helplines.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Details + Interactive Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Company Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 text-[#0B2545] text-xs font-bold font-mono">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>RC No. 9161655</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0B2545]">
                Wangarawa Global Technology Limited
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                “Empowering the next generation of innovators.” A practical technology training and digital services centre in Dutse, Jigawa State, Nigeria.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-slate-900">Official Office Address</p>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    No. 003 Wangara Shopping Complex,<br />
                    Sabuwar Takur,<br />
                    Dutse, Jigawa State, Nigeria.
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-slate-900">Official Email</p>
                  <a
                    href="mailto:wangarawatech@gmail.com"
                    className="text-[#0B2545] hover:underline font-medium block mt-0.5"
                  >
                    wangarawatech@gmail.com
                  </a>
                </div>
              </div>

              {/* Verified Phone Numbers */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-slate-900">Official Phone Numbers</p>
                  <div className="flex flex-col gap-0.5 mt-0.5 text-slate-700 font-medium font-mono">
                    <a href="tel:08169323996" className="hover:text-[#0B2545]">
                      08169323996
                    </a>
                    <a href="tel:08104508713" className="hover:text-[#0B2545]">
                      08104508713
                    </a>
                  </div>
                </div>
              </div>

              {/* Centre Hours */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-slate-900">Centre Operating Hours</p>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    Monday – Friday: 8:00 AM – 6:00 PM <br />
                    Saturday: 9:00 AM – 4:00 PM (Training & Cohort Labs)
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>Instant Chat Support</span>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Connect directly with our admissions and digital services desk on WhatsApp.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-lg space-y-6">
              <div>
                <h3 className="text-2xl font-extrabold text-[#0B2545]">Send Us an Inquiry</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in your details below and our team will respond promptly.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-950">Thank You! Your message has been received.</h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    A representative from Wangarawa Global Technology Limited will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-bold text-emerald-900 underline hover:text-emerald-700"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aminu Bello"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:border-[#0B2545] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. aminu@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:border-[#0B2545] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 08012345678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:border-[#0B2545] outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Service or Programme of Interest</label>
                      <select
                        value={formData.serviceOfInterest}
                        onChange={(e) => setFormData({ ...formData, serviceOfInterest: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:border-[#0B2545] outline-none bg-white"
                      >
                        <optgroup label="Core Training Programmes">
                          <option value="AI & Prompt Engineering">AI & Prompt Engineering</option>
                          <option value="Data Analytics & Data Science">Data Analytics & Data Science</option>
                          <option value="Cybersecurity">Cybersecurity</option>
                          <option value="Web Development">Web Development</option>
                          <option value="Basic Digital Skills & Computer Literacy">Basic Digital Skills & Computer Literacy</option>
                        </optgroup>
                        <optgroup label="Official Digital Services">
                          <option value="Printing & Document Services">Printing & Document Services</option>
                          <option value="Online & Digital Services">Online & Digital Services</option>
                          <option value="Website Development">Website Development</option>
                          <option value="Data Analytics & Reporting">Data Analytics & Reporting</option>
                          <option value="Social Media & Digital Marketing">Social Media & Digital Marketing</option>
                          <option value="Podcast & Media Production">Podcast & Media Production</option>
                        </optgroup>
                        <optgroup label="Strategic Collaboration">
                          <option value="Strategic Partnership / Support">Strategic Partnership / Support</option>
                          <option value="General Corporate Inquiry">General Corporate Inquiry</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Training registration inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:border-[#0B2545] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Message Details *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please describe how we can assist you..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:border-[#0B2545] outline-none resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-6 rounded-xl bg-[#0B2545] hover:bg-[#133E87] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <span>Submitting inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-amber-400" />
                        <span>Send Message to Wangarawa Tech</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Embed Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-[#0B2545]">Location Map</h3>
          <p className="text-xs text-slate-500">
            No. 003 Wangara Shopping Complex, Sabuwar Takur, Dutse, Jigawa State, Nigeria.
          </p>
        </div>

        <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-300 shadow-sm bg-slate-200">
          <iframe
            title="Wangarawa Tech Location in Dutse"
            src="https://maps.google.com/maps?q=Dutse%2C%20Jigawa%20State%2C%20Nigeria&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
};
