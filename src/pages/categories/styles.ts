import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

export const Top = styled.div`
  width: 100%;
  text-align: start;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Middle = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: min(90%, 50rem);

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
