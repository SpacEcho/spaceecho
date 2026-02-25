import React from 'react';
import InspirationCard from './InspirationCard';

export default function MasonryGrid({ inspirations }) {
  return (
    <div className="masonry-grid">
      {inspirations.map((inspiration, index) => (
        <InspirationCard
          key={inspiration.id}
          inspiration={inspiration}
          index={index}
        />
      ))}
    </div>
  );
}