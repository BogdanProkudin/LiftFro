import React from "react";

const Description = ({
  description,

  styles,
}: {
  description: string;

  styles?: string;
}) => {
  return (
    <p
      className={`${styles ? styles : "text-[16px]"}  text-[var(--description-text-color)]`}
    >
      {description}
    </p>
  );
};

export default Description;
