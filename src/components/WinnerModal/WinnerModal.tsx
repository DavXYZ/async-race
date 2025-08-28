import type React from 'react';
import type { JSX } from 'react';
import { useEffect, useState } from 'react';

import styles from './WinnerModal.module.css';
import { WinnerModalHeader } from './WinnerModalHeader';
import { WinnerModalContent } from './WinnerModalContent';
import { WinnerModalFooter } from './WinnerModalFooter';
import { CLOSE_DELAY } from './confetti';
import type { WinnerModalProps } from './winner_modal_types';

const WinnerModal: React.FC<WinnerModalProps> = ({
  winner,
  onClose,
}: WinnerModalProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(true), []);

  const handleClose = (): void => {
    setIsVisible(false);
    setTimeout(onClose, CLOSE_DELAY);
  };

  return (
    <div className={`${styles.overlay} ${isVisible ? styles.visible : ''}`} onClick={handleClose}>
      <div
        className={`${styles.modal} ${isVisible ? styles.visible : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <WinnerModalHeader onClose={handleClose} />
        <WinnerModalContent winner={winner} />
        <WinnerModalFooter onClose={handleClose} />
      </div>
    </div>
  );
};

export default WinnerModal;
