import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Wrapper({ children, className }: Props) {
  return (
    <div className={`w-full text-foreground px-4 sm:px-6 md:px-8 ${className}`}>{children}</div>
  );
}
