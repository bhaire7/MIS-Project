import React from 'react';

const AboutPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-white dark:from-black dark:via-black dark:to-black flex items-center justify-center py-12 px-4">
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-10 max-w-2xl w-full border-t-8 border-purple-400 dark:border-purple-700">
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Student"
          className="w-28 h-28 rounded-full border-4 border-purple-400 shadow-lg mb-4"
        />
        <h1 className="text-4xl font-extrabold text-purple-700 dark:text-purple-300 mb-2">About Us</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-lg">
          Welcome to our AnimeStore! This project is a demonstration of Management Information System (MIS) concepts, built as a part of the BCA 5th Semester curriculum at Kathmandu Model College.
        </p>
      </div>
      <div className="bg-purple-50 dark:bg-black rounded-xl p-6 mb-6 shadow-inner">
        <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">Student Information</h2>
        <ul className="text-gray-700 dark:text-gray-200 text-base space-y-1">
          <li><strong>Name:</strong> [Your Name Here]</li>
          <li><strong>Program:</strong> Bachelor of Computer Applications (BCA), 5th Semester</li>
          <li><strong>College:</strong> Kathmandu Model College</li>
          <li><strong>Location:</strong> Bagbazar, Kathmandu, Nepal</li>
          <li><strong>Email:</strong> your.email@example.com</li>
          <li><strong>Contact:</strong> +977-98XXXXXXXX</li>
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">Project Highlights</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1">
          <li>Modern e-commerce web application for anime products</li>
          <li>Built with React, Tailwind CSS, and modern web technologies</li>
          <li>Implements MIS concepts: product management, cart, checkout, and user authentication</li>
          <li>Responsive and user-friendly design</li>
          <li>Developed as a practical learning project</li>
        </ul>
      </div>
      <div className="bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-700 dark:to-pink-700 rounded-xl p-6 text-white text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-2">About Kathmandu Model College</h2>
        <p className="mb-2">Kathmandu Model College (KMC) is a leading institution in Nepal, known for its academic excellence and vibrant student community. The BCA program at KMC is designed to equip students with practical and theoretical knowledge in computer applications and information systems.</p>
        <a
          href="https://kmcen.edu.np/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-6 py-2 bg-white text-purple-700 font-semibold rounded-full shadow hover:bg-purple-100 transition"
        >
          Visit KMC Website
        </a>
      </div>
    </div>
  </div>
);

export default AboutPage; 