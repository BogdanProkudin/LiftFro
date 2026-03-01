import React from "react";

const Title = ({
  title,
  size,
  styles,
}: {
  title: string;
  size?: number;
  styles?: string;
}) => {
  const textSize = size ? `${size}px` : "24px";

  return (
    <h1
      style={{ fontSize: textSize }}
      className={`${styles} font-bold text-[var(--default-text-color)]`}
    >
      {title}
    </h1>
  );
};

export default Title;
