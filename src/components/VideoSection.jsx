import React from 'react';

export default function VideoSection() {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <video
        className="absolute w-full h-full object-cover opacity-70" // 🔼 Increased opacity for visibility
        src="/videos/hacker2.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="relative flex flex-col justify-center items-center h-full text-center text-green-400 font-mono space-y-8 p-4">
        {/* Text Container with semi-transparent dark background for contrast */}
        <div className="max-w-4xl space-y-6 bg-black/60 px-8 py-6 rounded-lg backdrop-blur-sm shadow-lg">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            Cyber Security Redefined
          </h1>

          <p className="text-lg md:text-xl font-medium text-green-300">
            Protect Your Digital Frontier with Next-Gen Solutions
          </p>
        </div>

        {/* CTA Button */}
        <button className="mt-8 px-8 py-3 bg-green-500 hover:bg-green-400 text-black rounded-lg border border-green-700 font-bold transition-all duration-300 hover:scale-105">
          Explore Security Solutions
        </button>
      </div>
    </section>
  );
}
