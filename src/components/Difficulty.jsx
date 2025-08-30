import React from 'react';
import styles from '../assets/Difficulty.module.css';

export default function Difficulty({ onSelect }) {
  const levels = ['Easy', 'Medium', 'Hard'];

  const handleClick = (index) => {
    onSelect?.(levels[index]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Choose Difficulty</div>
      <div className={styles.levels}>
        {levels.map((level, index) => (
          <React.Fragment key={index}>
            <div
              onClick={() => handleClick(index)}
              className={styles.circle}
              title={level}
            ><span className={styles.text}>{level}</span></div>
            {index < levels.length - 1 && <div className={styles.line}></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}