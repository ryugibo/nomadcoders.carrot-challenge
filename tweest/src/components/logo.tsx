import { SVGAttributes } from "react";

export default function Logo(props: SVGAttributes<SVGElement>) {
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <path
        d="M100 100
               C100 97, 97 95, 94 95
               C91 95, 88 97, 88 100
               C88 105, 93 110, 100 110
               C110 110, 120 103, 120 92
               C120 80, 110 70, 95 70
               C80 70, 65 80, 65 100
               C65 120, 80 135, 100 135
               C125 135, 145 120, 145 95
               C145 70, 125 50, 100 50
               C70 50, 45 70, 45 100
               C45 135, 70 160, 105 160"
        fill="none"
        stroke="#3498db"
        stroke-width="3"
        stroke-linecap="round"
      />

      <path
        d="M145 95 L170 70"
        stroke="#3498db"
        stroke-width="3"
        stroke-linecap="round"
      />
      <path
        d="M170 70 L155 70 M170 70 L170 85"
        stroke="#3498db"
        stroke-width="3"
        stroke-linecap="round"
      />

      <path
        d="M45 100 L20 125"
        stroke="#3498db"
        stroke-width="3"
        stroke-linecap="round"
      />
      <path
        d="M20 125 L35 125 M20 125 L20 110"
        stroke="#3498db"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  );
}
