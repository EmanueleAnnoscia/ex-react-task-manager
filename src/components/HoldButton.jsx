import { useState, useRef } from "react";
import styles from "./HoldButton.module.css"

//preso questo componente come spunto

function HoldButton({ onHoldComplete, holdTime = 3000, label = "Elimina" }) {
    const [progress, setProgress] = useState()
    const timeRef = useRef(null);
    const startTimeRef = useRef(null);

    const handleMouseDown = () => {
        startTimeRef.current = Date.now();

        timeRef.current = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            const percentage = Math.min((elapsed / holdTime) * 100, 100);
            setProgress(percentage);

            if (elapsed >= holdTime) {
                clearInterval(timeRef.current);
                setProgress(0)
                onHoldComplete();
            }
        }, 50)
    };

    const handleMouseUp = () => {
        clearInterval(timeRef.current);
        setProgress(0);
    };

     return (
    <button
      className={styles.holdButton}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <span>{label}</span>
      {progress > 0 && (
        <div className={styles.progressCircle}>
          <svg viewBox="0 0 36 36">
            <path
              className={styles.bg}
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={styles.fg}
              strokeDasharray={`${progress}, 100`}
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
        </div>
      )}
    </button>
  );

}

export default HoldButton