import { Room } from "./Room";
import { CollaborativeApp } from "./Chat";
import "@liveblocks/react-ui/styles.css";1

export default function Page() {
  return (
    <Room>
      <CollaborativeApp />
    </Room>
  );
}