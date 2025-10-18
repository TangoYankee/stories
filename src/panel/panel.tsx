import { JSX } from "solid-js/jsx-runtime";

export function Panel(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div id="panel" {...props}>
      Panel
    </div>
  )
}
