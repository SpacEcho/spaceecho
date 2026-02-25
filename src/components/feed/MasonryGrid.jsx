import React from 'react';
import InspirationCard from './InspirationCard';

export default function MasonryGrid({ inspirations }) {
  // Split items into two columns
  const leftColumn = inspirations.filter((_, index) => index % 2 === 0);
  const rightColumn = inspirations.filter((_, index) => index % 2 === 1);

  return (
    <div className="flex gap-3">
      <div className="flex-1 space-y-3">
        {leftColumn.map((inspiration, index) => (
          <InspirationCard
            key={inspiration.id}
            inspiration={inspiration}
            index={index * 2}
          />
        ))}
      </div>
      <div className="flex-1 space-y-3">
        {rightColumn.map((inspiration, index) => (
          <InspirationCard
            key={inspiration.id}
            inspiration={inspiration}
            index={index * 2 + 1}
          />
        ))}
      </div>
    </div>
  );
}