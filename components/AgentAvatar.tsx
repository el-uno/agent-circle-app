function hashHue(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash) % 360;
}

export function AgentAvatar({
  name,
  size = 44,
  ring = false,
}: {
  name: string;
  size?: number;
  ring?: boolean;
}) {
  const hue = hashHue(name);
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="relative shrink-0 rounded-xl"
      style={{ width: size, height: size, padding: ring ? 2 : 0 }}
    >
      {ring && (
        <div
          className="absolute inset-0 rounded-xl"
          style={{ background: "var(--grad-accent)" }}
          aria-hidden="true"
        />
      )}
      <div
        className="relative flex items-center justify-center rounded-[10px] font-semibold text-white"
        style={{
          width: ring ? size - 4 : size,
          height: ring ? size - 4 : size,
          margin: ring ? 2 : 0,
          fontSize: size * 0.36,
          background: `linear-gradient(135deg, hsl(${hue} 70% 55%), hsl(${hue + 40} 70% 40%))`,
        }}
      >
        {initials}
      </div>
    </div>
  );
}
