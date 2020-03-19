import React from "react";

interface ClinicalTrialHit {
  hit: {
    public_title: string;
    intervention: string;
    web_address: string;
  };
}

export const ClinicalTrialHit = ({
  hit: { public_title, web_address }
}: any) => (
  <div>
    <a href={web_address}>{public_title}</a>
  </div>
);
