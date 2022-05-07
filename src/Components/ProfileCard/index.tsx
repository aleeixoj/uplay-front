import { Container } from './styles';

export default function ProfileCard({ children, label, ...rest }) {
  return (
    <Container {...rest}>
      <div className="circle">{children}</div>
      <div className="label">{label}</div>
    </Container>
  );
}
