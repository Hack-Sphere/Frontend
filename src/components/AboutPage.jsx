import React from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono px-6 py-12">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-4 text-green-300">About HackSphere</h1>
          <p className="text-lg text-green-200 max-w-3xl mx-auto">
            Empowering the next generation of ethical hackers through immersive, hands-on cyber security training — 100% free and accessible to all.
          </p>
        </motion.section>

        {/* What We Do */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-bold mb-4">💻 What is HackSphere?</h2>
            <p className="text-green-200 leading-relaxed">
              HackSphere is a free platform for practical cybersecurity training. We believe learning to secure the digital world should be accessible to everyone, everywhere.
              Through our unique “Classroom” feature, we offer live-streamed ethical hacking sessions, simulations, and interactive challenges hosted by experienced instructors.
            </p>
            <p className="mt-4 text-green-300">
              Join live, ask questions, participate in real-time, and grow your skills with the community.
            </p>
          </motion.div>

          <motion.img
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            src="https://img.freepik.com/free-vector/hacker-activity-concept-illustration_114360-3105.jpg?t=st=1716711917~exp=1716715517~hmac=f14904df59137b2f9db29174eabb8bcac33a93fd96c7f60a951cc9c97fcfc3c8&w=1380"
            alt="Hacker training"
            className="rounded-lg shadow-lg"
          />
        </section>

        {/* Classroom Feature */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            src="https://img.freepik.com/free-vector/webinar-concept-illustration_114360-4764.jpg?t=st=1716712024~exp=1716715624~hmac=4bb02ce1e3f4ef2732e9bbfc7c1dd37b60e65a6604c7d3a31382e5b2a7804a60&w=1380"
            alt="Live streaming"
            className="rounded-lg shadow-lg"
          />

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-bold mb-4">📡 The “Classroom” Experience</h2>
            <p className="text-green-200 leading-relaxed">
              HackSphere's live “Classroom” feature enables real-time cybersecurity education. Our instructors share their screen, walk through attacks and defenses, and answer questions via a live chat.
            </p>
            <p className="mt-4">
              Students can:
              <ul className="list-disc list-inside mt-2 text-green-300">
                <li>Join a session securely using a class PIN</li>
                <li>Ask questions live</li>
                <li>Get instant feedback and learn by doing</li>
              </ul>
            </p>
          </motion.div>
        </section>

        {/* Our Mission */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">🌍 Our Mission</h2>
          <p className="text-green-200 leading-loose">
            We aim to break the barrier to cybersecurity education and create a global community of skilled, ethical hackers. Whether you’re a curious beginner or a passionate learner,
            HackSphere is your launchpad into the world of cybersecurity.
          </p>
        </motion.section>
      </div>
    </div>
  );
}
