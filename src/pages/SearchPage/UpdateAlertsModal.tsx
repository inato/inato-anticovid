import React, { useState, useCallback, ChangeEvent } from "react";
import qs from "qs";

import { Modal } from "../../ui/Modal";
import { styled } from "../../ui/styled";
import { colors } from "../../ui";
import config from "../../config";

const Bold = styled.strong`
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${colors.DarkGray};
`;

const Input = styled.input``;

export const UpdateAlertsModal = ({
  onRequestClose,
  searchState
}: {
  onRequestClose: () => void;
  searchState: {
    refinementList?: { [key: string]: Array<string> };
    toggle?: { [key: string]: string };
  };
}) => {
  const [email, setEmail] = useState("");

  const emailChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const submitHandler = useCallback(() => {
    const queryString = {
      email,
      ...searchState.toggle,
      ...searchState.refinementList
    };
    fetch(
      `${config.baseApiUrl}/subscribeToUpdates?${qs.stringify(queryString)}`
    );
  }, [email, searchState.refinementList, searchState.toggle]);

  return (
    <Modal
      size="small"
      title="Get update alerts"
      onRequestClose={onRequestClose}
      primaryAction={{
        label: "Subscribe to updates",
        onClick: submitHandler
      }}
      secondaryAction={{
        label: "Cancel",
        onClick: onRequestClose
      }}
    >
      <div>
        <Bold>Get alerted on new trials and results</Bold> matching your current
        search criteria
        <div>
          <div>
            <label htmlFor="email">Enter your email</label>
          </div>
          <Input
            type="email"
            required
            placeholder="Your email..."
            name="email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
          />
        </div>
      </div>
    </Modal>
  );
};
