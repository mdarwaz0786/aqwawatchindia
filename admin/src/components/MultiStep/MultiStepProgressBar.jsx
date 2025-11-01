import styles from "./MultiStepProgressBar.module.css";

const MultiStepProgressBar = ({ step, steps, stepLabels = [], onStepClick }) => {
  const stepArray = Array.from({ length: steps }, (_, i) => i + 1);

  return (
    <div className={styles.wrapper}>
      {stepArray.map((num, index) => {
        const isActive = num === step;
        const isClickable = true;

        return (
          <div
            key={num}
            className={`${styles.item} ${isClickable ? styles.clickable : ""}`}
            onClick={() => isClickable && onStepClick?.(num)}
          >
            {index !== 0 && (
              <div className={`${styles.line} ${isActive ? styles.activeLine : ""}`} />
            )}
            <div className={`${styles.circle} ${isActive ? styles.active : ""}`}>
              {num}
            </div>
            <div className={styles.label}>
              {stepLabels[index] || `Step ${num}`}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MultiStepProgressBar;
