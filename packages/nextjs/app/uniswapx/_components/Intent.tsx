import React from 'react';
import { RawOpenDutchIntentV2 } from "~~/types/banr1/raw-dutch-intent-v2";

interface IntentProps {
  intent: RawOpenDutchIntentV2;
}

export const Intent = ({ intent }: IntentProps) => {
  return (
    <div className="p-6 bg-base-200 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Dutch Intent Details</h2>
      
      {/* Display Input */}
      <div className="mb-4">
        <h3 className="text-md font-semibold">Input</h3>
        <p className="p-2 bg-base-100 rounded-lg">Token: {intent.input.token}</p>
        <p>Start Amount: {intent.input.startAmount.toString()}</p>
        <p>End Amount: {intent.input.endAmount.toString()}</p>
      </div>

      {/* Display Outputs */}
      <div className="mb-4">
        <h3 className="text-md font-semibold">Outputs</h3>
        <ul className="space-y-2">
          {intent.outputs.map((output, index) => (
            <li key={index} className="p-2 bg-base-100 rounded-lg">
              <p>Token: {output.token}</p>
              <p>Start Amount: {output.startAmount.toString()}</p>
              <p>End Amount: {output.endAmount.toString()}</p>
              <p>Recipient: {output.recipient}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Display Created At */}
      <div>
        <h3 className="text-md font-semibold">Created At</h3>
        <p className="p-2 bg-base-100 rounded-lg">{intent.createdAt}</p>
      </div>
    </div>
  );
};
