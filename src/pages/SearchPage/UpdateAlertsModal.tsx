import React, { useState, useCallback, ChangeEvent } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import qs from "qs";
import { keyframes } from "styled-components";

import { Modal } from "../../ui/Modal";
import { styled } from "../../ui/styled";
import {
  colors,
  EmailIcon,
  CheckmarkIcon,
  CrossIcon,
  SpinnerIcon
} from "../../ui";
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
  height: 40px;
  padding: 0 16px;
  font-size: ${props => props.theme.fontSizes.normal}px;
  border: 1px solid ${colors.GreyBackground};
  border-radius: 4px;
  padding-left: 40px;
`;

const InputContainer = styled.div`
  position: relative;
  svg {
    position: absolute;
    top: 11.5px;
    left: 9px;
    z-index: 10;
  }

  ${Input} {
    z-index: 1;
  }
`;

const getCrossIcon = () => {
  return `"data:image/svg+xml,${encodeURIComponent(
    renderToStaticMarkup(<CrossIcon />)
  )}"`;
};

const getCheckmarkIcon = () => {
  return `"data:image/svg+xml,${encodeURIComponent(
    renderToStaticMarkup(<CheckmarkIcon />)
  )}"`;
};

const getSpinnerIcon = () => {
  return `"data:image/svg+xml,${encodeURIComponent(
    renderToStaticMarkup(<SpinnerIcon />)
  )}"`;
};

const SubscriptionState = styled.div`
  margin: 32px 0;
  padding-left: 30px;
  &,
  &:before {
    background-repeat: no-repeat;
    background-size: 16px;
  }
`;

const rotating = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled(({ className }: { className?: string }) => {
  return (
    <SubscriptionState className={className}>Subscribing...</SubscriptionState>
  );
})`
  position: relative;

  &:before {
    content: " ";
    background-image: url(${getSpinnerIcon()});
    display: block;
    width: 24px;
    height: 24px;
    position: absolute;
    left: 0;
    animation: ${rotating} 0.55s linear infinite;
    background-size: 24px;
  }
`;

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
  &,
  a {
    color: ${colors.RedAlert};
  }
  background-image: url(${getCrossIcon()});
`;

const Success = styled(({ className }: { className?: string }) => {
  return (
    <SubscriptionState className={className}>
      You subscribed successfully
    </SubscriptionState>
  );
})`
  color: ${colors.GreenAlert};
  background-image: url(${getCheckmarkIcon()});
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
    if (!email) {
      setSubscriptionState("error");
      return;
    }
    setSubscriptionState("loading");
    const queryString = {
      email,
      facetFilters: {
        ...searchState.toggle,
        ...searchState.refinementList
      }
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
          subscriptionState === "success" ? onRequestClose : submitHandler,
        disabled: subscriptionState === "loading"
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
        <InputContainer>
          <EmailIcon />
          <Input
            type="email"
            required
            placeholder="Your email..."
            name="email"
            value={email}
            onChange={emailChangeHandler}
          />
        </InputContainer>
        <div>
          We will send you an email once a day at most
          <br />
          <SecondaryText>
            No spam, unsubscribe anytime, not shared with any third-party
          </SecondaryText>
          {subscriptionState === "loading" && <Loading />}
          {subscriptionState === "success" && <Success />}
          {subscriptionState === "error" && <Error />}
        </div>
      </Container>
    </Modal>
  );
};
