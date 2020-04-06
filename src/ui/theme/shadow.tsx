import { transparentize } from "polished";

import { colors } from "../colors";

import { spacings } from "./spacing";

export const shadows = {
  modal: `0 ${spacings.xs}px ${spacings.l}px ${transparentize(
    0.9,
    colors.ModalShadow
  )}`
};
