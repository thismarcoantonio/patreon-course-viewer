import { h } from "preact";

const icons = {
  menu: "M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z",
  close:
    "M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z",
  check:
    "M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z",
};

export function RemixIcon({ size, icon, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size || 24}
      height={size || 24}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path fill="currentColor" d={icons[icon]} />
    </svg>
  );
}
