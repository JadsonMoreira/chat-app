import { avatarColor, initials } from "../utils/helpers";

interface AvatarProps {
  name: string;
  size?: number;
}

function Avatar({ name, size = 32 }: AvatarProps) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: avatarColor(name), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: size * 0.35, flexShrink: 0, userSelect: "none" }}>
      {initials(name)}
    </div>
  );
}

export default Avatar;
