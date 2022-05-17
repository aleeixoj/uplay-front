import styled from 'styled-components';

export const Container = styled.div`
  grid-area: DH;

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px 24px;
  height: 8rem;
  background-color: ${(props) => props.theme.colors.base.bg};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[200]};
`;

export const Page = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3rem;
  color: ${(props) => props.theme.colors.base.text};

  > strong {
    font-size: 1.5rem;
  }
`;

export const Description = styled.span`
  max-width: 30%;
  color: ${(props) => props.theme.colors.base.text};
  font-size: 1rem;
  font-weight: lighter;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;