import styles from "./MultiStepProgressBar.module.css";

const MultiStepProgressBar = ({ step, steps, stepLabels = [], onStepClick }) => {
  const stepArray = Array.from({ length: steps }, (_, i) => i + 1);

  return (
    <div className={styles.wrapper}>
      {stepArray.map((num, index) => {
        const isCompleted = num < step;
        const isActive = num === step;
        const isClickable = num <= step; // 👈 only allow back navigation, not forward

        return (
          <div
            key={num}
            className={`${styles.item} ${isClickable ? styles.clickable : ""}`}
            onClick={() => isClickable && onStepClick?.(num)} // 👈 safe navigation
          >
            {index !== 0 && (
              <div
                className={`${styles.line} ${isCompleted ? styles.completed : ""}`}
              />
            )}
            <div
              className={`${styles.circle} ${isActive ? styles.active : isCompleted ? styles.completed : ""
                }`}
            >
              {isCompleted ? <span className={styles.checkmark}>✓</span> : num}
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
