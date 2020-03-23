import React from "react";

export enum Orientation {
  vertical = "vertical",
  horizontal = " horizontal"
}

export const Space = ({
  size,
  orientation,
  className
}: {
  size: number;
  orientation: Orientation;
  className?: string;
}) =>
  orientation === Orientation.vertical ? (
    <div className={className} style={{ height: size }} />
  ) : (
    <div className={className} style={{ width: size }} />
  );
