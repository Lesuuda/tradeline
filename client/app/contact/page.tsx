'use client';
import { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder for form submission (e.g., API call)
    setStatus('Thank you! Your message has been sent.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-16 px-6 md:px-20 lg:px-40 bg-gray-100 text-gray-800">
      <h2 className="text-4xl font-bold mb-6 text-center text-pink-500">Contact Our Developers</h2>
      <p className="text-center mb-12 text-lg text-gray-600">
        Reach out to us with any inquiries, suggestions, or feedback. We’d love to hear from you!
      </p>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Contact Information */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full lg:w-1/3 space-y-6">
          <h3 className="text-2xl font-semibold mb-4 text-pink-500">Get In Touch</h3>
          <p className="text-gray-600 mb-4">Feel free to contact us through any of the following:</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-pink-500 material-icons">phone</span>
              <p className="text-gray-700">+254 740 377358</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-pink-500 material-icons">email</span>
              <p className="text-gray-700">devlesuuda@gmail.com</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-pink-500 material-icons">location_on</span>
              <p className="text-gray-700">Maralal, Kenya</p>
            </div>
          </div>
          {/* Social Media Links */}
          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-pink-500 hover:text-pink-600 transition">
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a href="#" className="text-pink-500 hover:text-pink-600 transition">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" className="text-pink-500 hover:text-pink-600 transition">
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
            <a href="#" className="text-pink-500 hover:text-pink-600 transition">
              <i className="fab fa-github fa-lg"></i>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full lg:w-2/3">
          <h3 className="text-2xl font-semibold mb-6 text-pink-500">Send a Message</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500 transition"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500 transition"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-pink-500 text-white font-semibold py-3 rounded-md hover:bg-pink-600 transition duration-300"
          >
            Send Message
          </button>
          {status && <p className="mt-4 text-green-500 text-center">{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
