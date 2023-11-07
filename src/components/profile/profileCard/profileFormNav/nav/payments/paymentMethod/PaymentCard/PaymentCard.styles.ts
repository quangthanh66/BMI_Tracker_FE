import styled from 'styled-components';

interface PaymentCardProps {
  $background: string;
}

export const Wrapper = styled.div<PaymentCardProps>`
  & > .rccs > .rccs__card--unknown > div {
    background: ${(props) => `url(${props.$background})`};
    background-size: cover;
    transition: all 0s ease;
  }

  & > .rccs > .rccs__card {
    & .rccs__card--front,
    & .rccs__card--back {
      box-shadow: none;
    }

    & > .rccs__card--front .rccs__issuer {
      right: 0%;
      left: 0%;
      background-position: center;
    }

    & > div {
      color: var(--text-secondary-color);

      & > .rccs__chip {
        display: none;
      }

      & > div:first-of-type {
        background: ${(props) => `url(${props.$background})`};
        background-size: cover;
        transition: all 0s ease;
      }
    }
  }
`;
