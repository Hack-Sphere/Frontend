import React from 'react';

export default function StreamPlayer({ streamUrl }) {
  return (
    <div className="w-full flex justify-center items-center bg-black py-8">
      <div className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-green-400">
        <iframe
          src={streamUrl}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          frameBorder="0"
          title="Live Stream"
        ></iframe>
      </div>
    </div>
  );
}
