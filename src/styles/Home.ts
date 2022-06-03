import styled from 'styled-components';

import { LinkAnchor } from '../Components/LinkAnchor';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 1rem 0;
  gap: 1rem;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;
const Payments = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 3rem;
  width: 60rem;
  height: 6rem;
  background: #fff;
  box-shadow: 0px 0px 11px 1px rgba(0, 0, 0, 0.08);
  border-radius: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 15rem;
    height: 20rem;
    align-items: flex-start;
    gap: 0;
  }
  .box1 {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    border-left: 5px solid ${(props) => props.theme.colors.orange[700]};
    border-right: 1px solid ${(props) => props.theme.colors.gray[200]};
    padding: 1rem;

    @media (max-width: 768px) {
      border-left: none;
      border-right: none;
      border-bottom: 1px solid ${(props) => props.theme.colors.gray[200]};
    }

    span:first-child {
      font-size: 1rem;
      color: ${(props) => props.theme.colors.base.text};
    }
    span {
      font-size: 0.875rem;
      color: ${(props) => props.theme.colors.gray[200]};
    }
  }

  .box2 {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      color: ${(props) => props.theme.colors.cyan[800]};
      background: ${(props) => props.theme.colors.gray[50]};
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 1.2rem;
      box-shadow: 0px 0px 11px 1px rgba(0, 0, 0, 0.09);
    }
    span {
      font-size: 1rem;
      color: ${(props) => props.theme.colors.base.text};
    }
  }
`;

const StyledLinkAnchor = styled(LinkAnchor)`
  width: 12rem;
  background: ${(props) => props.theme.colors.orange[800]};
`;

export { Container, Flex, StyledLinkAnchor, Payments };
