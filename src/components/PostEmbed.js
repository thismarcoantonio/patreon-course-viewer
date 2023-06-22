import { h } from "preact";

export function PostEmbed({ embed }) {
  return <div dangerouslySetInnerHTML={{ __html: embed }} />;
}
