import React from "react";

const Title = ({
  title,

  styles,
}: {
  title: string;

  styles?: string;
}) => {
  return (
    <h1
      className={`${styles ? styles : "text-[24px]"} font-bold text-[var(--default-text-color)]`}
    >
      {title}
    </h1>
  );
};

export default Title;
