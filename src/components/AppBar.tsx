// src/components/AppBar.tsx

import React from 'react';

const AppBar: React.FC = () => {
  return (
    <div style={styles.appBar}>
      <h1 style={styles.title}>Título de la App</h1>
      <h2 style={styles.subtitle}>Bienvenido a nuestra aplicación de notas</h2>
    </div>
  );
};

const styles = {
  appBar: {
    backgroundColor: '#FFD1DC', // Color pastel (puedes cambiarlo si deseas)
    borderRadius: '10px',
    margin: '0px',
    padding: '20px',
    textAlign: 'center' as 'center',
  },
  title: {
    fontWeight: 'bold' as 'bold',
    margin: '0px',
  },
  subtitle: {
    fontWeight: 400 as 400, // Fuente regular
    margin: '0px',
  },
};

export default AppBar;
