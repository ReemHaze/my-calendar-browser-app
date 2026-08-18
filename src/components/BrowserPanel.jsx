import React from 'react';

const BrowserPanel = ({ selectedDate }) => {
  return (
    <div className="browser-panel">
      <h2>Selected Date</h2>
      <p>{selectedDate ? selectedDate.toDateString() : 'No date selected'}</p>
      {/* Additional content related to the selected date can be added here */}
    </div>
  );
};

export default BrowserPanel;