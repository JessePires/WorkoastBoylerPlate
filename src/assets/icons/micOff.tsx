import { JSX } from 'react';

const MicOffIcon = ({
  color = 'stroke-gray-400',
  width = '17',
  height = '24',
}: {
  color?: string;
  height?: string;
  width?: string;
}): JSX.Element => {
  return (
    <svg width={width} height={height} viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2_2)">
        <path
          d="M9 18.75C12.3137 18.75 15 16.0637 15 12.75V11.25M9 18.75C5.68629 18.75 3 16.0637 3 12.75V11.25M9 18.75V22.5M5.25 22.5H12.75M9 15.75C7.34315 15.75 6 14.4069 6 12.75V4.5C6 2.84315 7.34315 1.5 9 1.5C10.6569 1.5 12 2.84315 12 4.5V12.75C12 14.4069 10.6569 15.75 9 15.75Z"
          className={color}
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path className={color} d="M1 23L16 1" strokeLinecap="round" strokeWidth="0.8" />
      </g>
      <defs>
        <clipPath id="clip0_2_2">
          <rect width={width} height={height} fill="transparent" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MicOffIcon;
