import type React from 'react';
import {useEffect, useState} from 'react';

import type {Car} from '@/types';
import CarSvg from '@/assets/svg/CarSvg';

import styles from './WinnerModal.module.css';

interface WinnerModalProps {
    winner: Car;
    onClose: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({winner, onClose}) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div className={`${styles.overlay} ${isVisible ? styles.visible : ''}`} onClick={handleClose}>
            <div
                className={`${styles.modal} ${isVisible ? styles.visible : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.header}>
                    <div className={styles.confetti}>
                        {Array.from({length: 20}, (_, i) => (
                            <div
                                key={i}
                                className={styles.confettiPiece}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                                }}
                            />
                        ))}
                    </div>
                    <h2 className={styles.title}>🏆 Race Winner!</h2>
                    <button onClick={handleClose} className={styles.closeButton}>
                        ×
                    </button>
                </div>

                <div className={styles.content}>
                    <div className={styles.winnerCar}>
                        <CarSvg color={winner.color}/>
                    </div>
                    <h3 className={styles.winnerName}>{winner.name}</h3>
                    <p className={styles.winnerMessage}>Congratulations! {winner.name} won the race!</p>

                    <div className={styles.celebration}>
                        <div className={styles.firework}></div>
                        <div className={styles.firework}></div>
                        <div className={styles.firework}></div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <button onClick={handleClose} className={styles.button}>
                        Awesome!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WinnerModal;
