import React from "react";

const WarningText = ({ text }: { text: string }) => {
  return (
    <div className="text-lg h-screen w-full flex items-center text-slate-600 justify-center">
      {text}
    </div>
  );
};

export default WarningText;
