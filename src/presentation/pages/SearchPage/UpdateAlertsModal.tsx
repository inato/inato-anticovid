import React, { useState, useCallback, ChangeEvent, useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { keyframes } from 'styled-components';

import { Modal } from '../../ui/Modal';
import { styled } from '../../ui/styled';
import {
  colors,
  EmailIcon,
  CheckmarkIcon,
  CrossIcon,
  SpinnerIcon,
  fontSize,
  lineHeight,
} from '../../ui';
import { useAPIServiceContext } from '../../contexts';

import { getActiveSearchFilters, SearchState } from './SearchFilters';

const Bold = styled.strong`
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${colors.DarkGray};
`;

const Container = styled.div`
  color: ${colors.DarkGray};
  margin-top: 16px;
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
    renderToStaticMarkup(<CrossIcon />),
  )}"`;
};

const getCheckmarkIcon = () => {
  return `"data:image/svg+xml,${encodeURIComponent(
    renderToStaticMarkup(<CheckmarkIcon />),
  )}"`;
};

const getSpinnerIcon = () => {
  return `"data:image/svg+xml,${encodeURIComponent(
    renderToStaticMarkup(<SpinnerIcon />),
  )}"`;
};

const SubscriptionState = styled.div`
  margin: 32px 0;
  padding-left: 30px;
  &,
  &:before {
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: 4px 4px;
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
    content: ' ';
    background-image: url(${getSpinnerIcon()});
    display: block;
    width: 24px;
    height: 24px;
    position: absolute;
    left: 0;
    animation: ${rotating} 0.55s linear infinite;
    background-size: 24px;
    background-position: 0 0;
  }
`;

const Error = styled(({ className }: { className?: string }) => {
  return (
    <SubscriptionState className={className}>
      An error has occured. Please retry.
      <br />
      If this occurs again, please contact{' '}
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

const TagsContainer = styled.div`
  margin-top: 8px;
`;

const Tag = styled.span`
  background-color: ${colors.Border};
  color: ${colors.GreySecondaryText};
  font-size: ${fontSize.Small};
  height: ${lineHeight.Small};
  line-height: ${lineHeight.Small};
  display: inline-block;
  border-radius: 4px;
  margin-top: 4px;
  padding: 0 8px;

  & + & {
    margin-left: 4px;
  }
`;

export const UpdateAlertsModal = ({
  onRequestClose,
  searchState,
}: {
  onRequestClose: () => void;
  searchState: SearchState;
}) => {
  const apiService = useAPIServiceContext();
  const [email, setEmail] = useState('');
  const [subscriptionState, setSubscriptionState] = useState<
    'loading' | 'success' | 'error' | undefined
  >(undefined);

  const tags = useMemo(() => getActiveSearchFilters(searchState), [
    searchState,
  ]);

  const emailChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const submitHandler = useCallback(async () => {
    if (!email) {
      setSubscriptionState('error');
      return;
    }
    setSubscriptionState('loading');

    const result = await apiService.subscribeToUpdates({
      email,
      filters: {
        ...searchState.toggle,
        ...searchState.refinementList,
      },
    });

    if (result) {
      setSubscriptionState('success');
      return;
    }
    setSubscriptionState('error');
  }, [apiService, email, searchState.refinementList, searchState.toggle]);

  return (
    <Modal
      size="small"
      title="Get update alerts"
      onRequestClose={onRequestClose}
      primaryAction={{
        label:
          subscriptionState === 'success' ? 'Close' : 'Subscribe to updates',
        onClick:
          subscriptionState === 'success' ? onRequestClose : submitHandler,
        disabled: subscriptionState === 'loading',
      }}
      secondaryAction={
        subscriptionState === 'success'
          ? undefined
          : {
              label: 'Cancel',
              onClick: onRequestClose,
            }
      }
    >
      <Container>
        <SecondaryText>
          <Bold>Get alerted on new trials and results</Bold> matching your
          criteria:
        </SecondaryText>
        <TagsContainer>
          {tags.map(value => (
            <Tag key={value}>{value}</Tag>
          ))}
        </TagsContainer>
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
          {subscriptionState === 'loading' && <Loading />}
          {subscriptionState === 'success' && <Success />}
          {subscriptionState === 'error' && <Error />}
        </div>
      </Container>
    </Modal>
  );
};
