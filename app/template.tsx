import { ViewTransition } from "react"
import { fromHomeTransition } from "@/lib/transitions"

// Templates remount on navigation, so this boundary exits with the old page and enters with the new one.
// The animation only runs for navigations that start on the homepage; every other navigation stays instant.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ [fromHomeTransition]: "page-enter", default: "none" }}
      exit={{ [fromHomeTransition]: "home-exit", default: "none" }}
      default="none"
    >
      {children}
    </ViewTransition>
  )
}
