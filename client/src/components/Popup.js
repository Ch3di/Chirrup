import React from "react";
import { Popup as P } from "semantic-ui-react";

export default function Popup({ children, content }) {
  return <P inverted content={content} trigger={children} />;
}
