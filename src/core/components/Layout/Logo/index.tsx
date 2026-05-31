type LogoEssencesProps = {
  className?: string;
  ariaLabel?: string;
};

export default function LogoEssences({
  className = "",
  ariaLabel = "Essences",
}: LogoEssencesProps) {
  return (
    <svg
      viewBox="0 0 74.699318 20.910353"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <title>{ariaLabel}</title>
      <defs id="defs1" />
      <g id="layer1" transform="translate(-67.277754,-106.30482)">
        <text
          xmlSpace="preserve"
          style={{
            fontSize: "25.4px",
            fontFamily: "'Pinyon Script', cursive",
            fill: "#ffffff",
            strokeWidth: 0.264583,
          }}
          x="67.290161"
          y="123.6805"
          id="text1"
        >
          <tspan
            id="tspan1"
            x="67.290161"
            y="123.6805"
            style={{
              fontSize: "25.4px",
              fill: "#ffffff",
              strokeWidth: 0.264583,
            }}
          >
            Essences
          </tspan>
        </text>
      </g>
    </svg>
  );
}

