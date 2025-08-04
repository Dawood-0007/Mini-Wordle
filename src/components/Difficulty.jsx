import React, { useState } from 'react';

export default function Difficulty({ onSelect }) {
  const levels = ['Easy', 'Medium', 'Hard'];

  const handleClick = (index) => {
    onSelect?.(levels[index]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Choose Difficulty</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {levels.map((level, index) => (
          <React.Fragment key={index}>
            <div
              onClick={() => handleClick(index)}
              style={{
                ...styles.circle,
                backgroundColor: 'white',
              }}
              title={level}
            ><span style={styles.span}>{level}</span></div>
            {index < levels.length - 1 && <div style={styles.line}></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40vw',
    height: '97vh',
    marginTop: 40,
    flexDirection: 'column',
    margin: 'auto auto'
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  span: {
    color: 'white',
    textAlign: 'center',
    lineHeight: '120px',
    marginLeft: 3,
  },
  line: {
    width: 60,
    height: 4,
    backgroundColor: 'white',
  },
};
