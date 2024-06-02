"use client";

import React from 'react';
import './order-tracker.css';

interface CartItemProps {
    states: string[];
    currentState: number;
  }
  
const OrderTracker: React.FC<CartItemProps> = ({states, currentState}) => {
  return (
    <div className="order-tracker">
      <div className="states-container">
        {states.map((state, index) => (
          <div key={index} className={`state ${index <= currentState - 1 ? 'active' : ''}`}>
            <div className="state-number">{index + 1}</div>
            <div className="state-title">{state}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracker;
