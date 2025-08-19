import React from 'react';
import '../../styles/footer.css';

interface RunningTextFooterProps {
  cutoffTime?: string;
  arrivalTime?: string;
}

export default function RunningTextFooter({ 
  cutoffTime = "13:30", 
  arrivalTime = "22:30" 
}: RunningTextFooterProps) {
  return (
    <footer className="running-footer">
      {/* Cutoff Time Row */}
      <div className="running-row cutoff">
        <div className="running-text cutoff-text">
          <span className="running-content">
            🚨 Cutoff Time / Giờ cắt hàng - {cutoffTime} 🚨&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>
      
      {/* Impression Arrival Row */}
      <div className="running-row arrival">
        <div className="running-text arrival-text">
          <span className="running-content">
            📦 Impression arrival / Dấu răng về - {arrivalTime} 📦&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>
    </footer>
  );
}