import React from "react";

const Description = ({
  description,
  size,
  styles,
}: {
  description: string;
  size?: number;
  styles?: string;
}) => {
  const textSize = size ? `${size}px` : "16px";
  return (
    <p
      style={{ fontSize: textSize }}
      className={`${styles} text-md text-[var(--description-text-color)]`}
    >
      {description}
    </p>
  );
};

export default Description;
