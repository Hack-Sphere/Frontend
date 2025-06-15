import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="bg-black text-green-400 font-mono py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl font-bold">About Hackesphere</h2>
        <p>
          Hackesphere is focused on building your hacking skills practically, not just in theory.
          Our platform offers real-world labs, live mentorship, and the opportunity to practice your craft daily.
        </p>
      </div>
    </section>
  );
}
// Compare this snippet from src/components/Footer.jsx: 