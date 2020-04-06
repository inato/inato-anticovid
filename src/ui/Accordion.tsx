import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";

import { useBoolean } from "../hooks";

import { colors, ArrowRightIcon, ArrowDownIcon } from ".";

type AccordionProps = {
  title: string;
  className?: string;
};

export const Accordion = styled(
  (props: React.PropsWithChildren<AccordionProps>) => {
    const { isTrue: isActive, toggle: toggleActive } = useBoolean(false);
    const [height, setHeight] = useState("0px");

    const accordionContent = useRef(null);

    function toggleAccordion() {
      toggleActive();
      // eslint-disable-next-line
      // @ts-ignore
      const contentHeight = accordionContent.current.scrollHeight;
      setHeight(isActive ? "0px" : `${contentHeight}px`);
    }

    return (
      <AccordionSection className={props.className}>
        <TitleContainer>
          <ClickableContainer onClick={toggleAccordion}>
            {isActive ? <StyledArrowDownIcon /> : <StyledArrowRightIcon />}
            <AccordionTitle>{props.title}</AccordionTitle>
          </ClickableContainer>
        </TitleContainer>
        <AccordionContent
          ref={accordionContent}
          style={{ maxHeight: `${height}` }}
        >
          {props.children}
        </AccordionContent>
      </AccordionSection>
    );
  }
)``;

const AccordionSection = styled.div``;

const arrowIconsStyle = css`
  margin-right: 4px;
  transition-duration: 150ms;
  stroke: ${colors.Primary};
`;
const StyledArrowDownIcon = styled(ArrowDownIcon)`
  ${arrowIconsStyle};
`;
const StyledArrowRightIcon = styled(ArrowRightIcon)`
  ${arrowIconsStyle};
`;

const AccordionTitle = styled.div`
  font-weight: 500;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  color: ${colors.Primary};
`;

const ClickableContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    ${AccordionTitle} {
      color: ${colors.DefaultTextHover};
    }
    ${StyledArrowDownIcon} {
      stroke: ${colors.DefaultTextHover};
    }
    ${StyledArrowRightIcon} {
      margin-left: 2px;
      margin-right: 2px;
      stroke: ${colors.DefaultTextHover};
    }
  }
`;

const AccordionContent = styled.div`
  overflow: hidden;
  transition: max-height 0.1s linear;
  ul {
    margin-top: 0;
  }
`;
