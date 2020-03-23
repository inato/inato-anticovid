import React from "react";

export enum Orientation {
  vertical = "vertical",
  horizontal = " horizontal"
}

export const Space = ({
  size,
  orientation
}: {
  size: number;
  orientation: Orientation;
}) =>
  orientation === Orientation.vertical ? (
    <div style={{ height: size }} />
  ) : (
    <div style={{ width: size }} />
  );
