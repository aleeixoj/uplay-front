import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  padding: 1rem;
  gap: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[100]};
  width: 80%;
  cursor: pointer;
  .circle {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 3.5rem;
    height: 3.5rem;

    border-radius: 2rem;
    background: white;
    border: 1px solid ${(props) => props.theme.colors.orange[800]};
    color: ${(props) => props.theme.colors.orange[800]};
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  .label {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.base.text};
  }
`;
