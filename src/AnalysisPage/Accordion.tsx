import React, { useState, useRef } from "react";
import styled from "styled-components";

import { ArrowDownIcon } from "../ui/ArrowDownIcon";
import { ArrowRightIcon } from "../ui/ArrowRightIcon";

type AccordionProps = {
  title: string;
};

export const Accordion: React.FunctionComponent<AccordionProps> = props => {
  const [isActive, setActive] = useState("");
  const [height, setHeight] = useState("0px");

  const accordionContent = useRef(null);

  function toggleAccordion() {
    setActive(isActive === "" ? "active" : "");
    // eslint-disable-next-line
    // @ts-ignore
    const contentHeight = accordionContent.current.scrollHeight;
    setHeight(isActive === "active" ? "0px" : `${contentHeight}px`);
  }

  return (
    <AccordionSection>
      <TitleContainer onClick={toggleAccordion}>
        {isActive ? <StyledArrowDownIcon /> : <StyledArrowRightIcon />}
        <AccordionTitle>{props.title}</AccordionTitle>
      </TitleContainer>
      <AccordionContent
        ref={accordionContent}
        style={{ maxHeight: `${height}` }}
      >
        {props.children}
      </AccordionContent>
    </AccordionSection>
  );
};

const AccordionSection = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  margin-top: 16px;
  align-items: center;
  cursor: pointer;
`;

const AccordionTitle = styled.div`
  font-weight: 500;
`;

const AccordionContent = styled.div`
  overflow: hidden;
  transition: max-height 0.1s linear;
`;

const StyledArrowDownIcon = styled(ArrowDownIcon)`
  margin-right: 4px;
`;
const StyledArrowRightIcon = styled(ArrowRightIcon)`
  margin-right: 5px;
`;
