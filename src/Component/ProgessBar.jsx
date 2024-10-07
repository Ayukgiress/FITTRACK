// src/components/ProgressBar.js
const ProgressBar = ({ percentage }) => (
    <div className="w-full bg-gray-300 rounded-full h-2">
      <div
        className="bg-green-500 h-2 rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
  
  export default ProgressBar;
  