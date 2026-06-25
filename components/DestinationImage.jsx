'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const DEFAULT_IMAGE_SIZE = {
  width: 1600,
  height: 1200,
};

export default function DestinationImage({
  src,
  alt,
  className = '',
  sizes,
  priority = false,
  fill = false,
}) {
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

  const imageProps = fill ? { fill: true } : DEFAULT_IMAGE_SIZE;

  return (
    <Image
      {...imageProps}
      className={className || undefined}
      src={src}
      alt={alt}
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
