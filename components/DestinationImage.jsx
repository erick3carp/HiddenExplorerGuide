'use client';

import { useEffect, useState } from 'react';

export default function DestinationImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    setFailed(!src);
  }, [src]);

  if (failed) {
    const accessibilityProps = alt
      ? { role: 'img', 'aria-label': alt }
      : { 'aria-hidden': true };

    return (
      <div className={`image-placeholder ${className}`.trim()} {...accessibilityProps}>
        <span>Photo unavailable</span>
      </div>
    );
  }

  return (
    <img
      className={className || undefined}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}
