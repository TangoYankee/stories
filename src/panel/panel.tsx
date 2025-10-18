import { JSX } from "solid-js/jsx-runtime";

export function Panel(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div id="panel" {...props}>
      <h2>Subway Stations</h2>
      <h2>City Council Districts</h2>
    </div>
  )
}
