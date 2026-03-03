import type { LucideProps } from 'lucide-react';

type TextIconProps = Pick<LucideProps, 'size' | 'className'>;

export const PIcon = ({ size = 16, className = '' }: TextIconProps) => (
  <span
    className={`font-semibold inline-flex items-center justify-center leading-none ${className}`.trim()}
    style={{ fontSize: size }}
  >
    P
  </span>
);

export const P1Icon = ({ size = 16, className = '' }: TextIconProps) => (
  <span
    className={`font-semibold inline-flex items-center justify-center leading-none ${className}`.trim()}
    style={{ fontSize: size }}
  >
    P1
  </span>
);

export const DotMD = () => (
  <span className="font-semibold text-green-500 inline-block">.md</span>
);

export const AI = () => (
  <span className="font-semibold text-green-500 inline-block">AI</span>
);
