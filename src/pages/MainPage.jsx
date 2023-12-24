import React from 'react';
import AndrewMessage from '../components/AndrewMessage';
import JoonMessage from '../components/JoonMessage';

function MainPage() {
  return (
    <div className="flex">
      <AndrewMessage />
      <JoonMessage />
    </div>
  );
}

export default MainPage;
