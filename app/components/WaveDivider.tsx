interface WaveDividerProps {
  from?: string;
  to?: string;
  flip?: boolean;
}

export default function WaveDivider({
  from = "#FFFFFF",
  to = "#FFFFFF",
  flip = false,
}: WaveDividerProps) {
  return (
    <div
      style={{
        lineHeight: 0,
        backgroundColor: from,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "80px" }}
      >
        <path
          d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}
