import React, { useState, useRef } from "react";
import styled from "styled-components";

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
      <AccordionTitle onClick={toggleAccordion}>{props.title}</AccordionTitle>
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

const AccordionTitle = styled.div`
  margin-top: 16px;
  font-weight: 500;
  cursor: pointer;
`;

const AccordionContent = styled.div`
  overflow: hidden;
`;
