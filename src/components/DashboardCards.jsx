import React from 'react';

const cards = [
  { label: 'Total Employees', value: 23, icon: '👥' },
  { label: 'Interns', value: 6, icon: '🧑‍💻' },
  { label: 'Ongoing Projects', value: 4, icon: '🚀' },
];

const DashboardCards = () => {
  return (
    <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
      {cards.map((card, index) => (
        <div key={index} style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          flex: 1,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '30px' }}>{card.icon}</div>
          <h3>{card.label}</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
