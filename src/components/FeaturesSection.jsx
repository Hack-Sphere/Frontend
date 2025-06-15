import React from 'react';

export default function FeaturesSection() {
  const features = [
    { title: "Practical Pentesting", description: "Hands-on network penetration testing labs." },
    { title: "Network Security", description: "Secure communication, firewalls, VPNs." },
    { title: "Programming For Hackers", description: "Learn Programming Python, C , Bash, Js&Html" },
    { title: "Reverse Engineering ", description: "Learn to Hack Software Application Binary exploitation Buffer overflow" },
    { title: "Web Application Security ", description: " learn to find Bugs in web apps ; XSS, SQL Injection, SSRF, Dos  " },
    { title: "Android Hacking ", description: "Exploit Android Through adb Dynamic & static analysis" },
  ];

  return (
    <section id="courses" className="bg-black text-green-400 font-mono py-20 px-4">
      <a><div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        {features.map((feature, idx) => (
          <div key={idx} className="border border-green-500 p-6 rounded-xl hover:scale-105 transition transform duration-500 shadow-lg shadow-green-500/30">
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div></a>
    </section>
  );
}
