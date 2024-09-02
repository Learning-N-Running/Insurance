import ReactDOM from "react-dom";
import styled from "styled-components";

interface ModalProps {
  title?: string;
  noHeader?: boolean;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 50;
`;

const ModalContainer = styled.div<{ className?: string }>`
  position: relative;
  background-color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 32rem;
  width: calc(100% - 2rem);
  ${({ className }) => className && `className: ${className};`}
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
`;

const CloseButton = styled.p`
  font-size: 1.125rem;
  cursor: pointer;
`;

export default function Modal({
  isOpen,
  title,
  noHeader,
  onClose,
  children,
  className,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalContainer className={className} onClick={(e) => e.stopPropagation()}>
        {!noHeader && (
          <Header>
            <Title>{title}</Title>
            <CloseButton onClick={onClose}>&#x2715;</CloseButton>
          </Header>
        )}
        {children}
      </ModalContainer>
    </Overlay>,
    document.body
  );
}
