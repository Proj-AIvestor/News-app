import React from "react";

export default function Button({
  children,
  onClick,
  className = "", // Add className prop
  ...rest
}) {
  return (
    <button
      onClick={onClick}
      className={className} // Apply the passed className
      {...rest}
    >
      {children}
    </button>
  );
}