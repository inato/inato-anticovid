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

const Container = styled.div`
  color: ${colors.DarkGray};
`;

const SecondaryText = styled.span`
  color: ${colors.SecondaryText};
`;

const Input = styled.input`
  display: block;
  margin: 16px 0;
  width: 100%;
  line-height: 40px;
  padding: 0 16px;
  font-size: ${props => props.theme.fontSizes.normal}px;
  border: 1px solid ${colors.GreyBackground};
  border-radius: 4px;
`;

const SubscriptionState = styled.div`
  margin: 32px 0;
`;

const Loading = styled(({ className }: { className?: string }) => {
  return (
    <SubscriptionState className={className}>Subscribing...</SubscriptionState>
  );
})``;

const Error = styled(({ className }: { className?: string }) => {
  return (
    <SubscriptionState className={className}>
      An error has occured. Please retry.
      <br />
      If this occurs again, please contact{" "}
      <a
        href="mailto:anticovid@inato.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        anticovid@inato.com
      </a>
    </SubscriptionState>
  );
})`
  color: ${colors.RedAlert};
`;

const Success = styled(({ className }: { className?: string }) => {
  return (
    <SubscriptionState className={className}>
      You subscribed successfully
    </SubscriptionState>
  );
})`
  color: ${colors.GreenAlert};
`;

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
  const [subscriptionState, setSubscriptionState] = useState<
    "loading" | "success" | "error" | undefined
  >(undefined);

  const emailChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const submitHandler = useCallback(async () => {
    setSubscriptionState("loading");
    const queryString = {
      email,
      ...searchState.toggle,
      ...searchState.refinementList
    };
    const result = await fetch(
      `${config.baseApiUrl}/subscribeToUpdates?${qs.stringify(queryString)}`
    );

    if (result.status === 204) {
      setSubscriptionState("success");
      return;
    }
    setSubscriptionState("error");
  }, [email, searchState.refinementList, searchState.toggle]);

  return (
    <Modal
      size="small"
      title="Get update alerts"
      onRequestClose={onRequestClose}
      primaryAction={{
        label:
          subscriptionState === "success" ? "Close" : "Subscribe to updates",
        onClick:
          subscriptionState === "success" ? onRequestClose : submitHandler
      }}
      secondaryAction={
        subscriptionState === "success"
          ? undefined
          : {
              label: "Cancel",
              onClick: onRequestClose
            }
      }
    >
      <Container>
        <SecondaryText>
          <Bold>Get alerted on new trials and results</Bold> matching your
          current search criteria
        </SecondaryText>
        <Input
          type="email"
          required
          placeholder="Your email..."
          name="email"
          value={email}
          onChange={emailChangeHandler}
        />
        <div>
          We will sent you an email at most once a day
          <br />
          <SecondaryText>
            No spam, unsubscribe anytime, not shared with a third-party
          </SecondaryText>
          {subscriptionState === "loading" && <Loading />}
          {subscriptionState === "success" && <Success />}
          {subscriptionState === "error" && <Error />}
        </div>
      </Container>
    </Modal>
  );
};
