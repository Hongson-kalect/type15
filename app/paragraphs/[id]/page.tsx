"use client";

import * as React from "react";

export default function ParagraphDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  return <div>{id}</div>;
}
