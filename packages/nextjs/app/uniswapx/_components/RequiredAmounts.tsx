import React from "react";
import { formatTokenAmount } from "../_helpers/helpers";
import { IntentTimestampAmount } from "~~/types/types";

interface RequiredAmountsDisplayProps {
  currentTime: number;
  requiredAmounts: IntentTimestampAmount[];
}

export const RequiredAmountsDisplay = ({ currentTime, requiredAmounts }: RequiredAmountsDisplayProps) => {
  const rows: JSX.Element[] = [];

  requiredAmounts.forEach(([timestamp, value]) => {
    const isCurrentTime = timestamp === currentTime;
    rows.push(
      <tr
        key={timestamp}
        className={isCurrentTime ? "text-success" : ""}
        style={{ fontWeight: isCurrentTime ? "bold" : "normal" }}
      >
        <td>{new Date(timestamp * 1000).toUTCString()}</td>
        <td>{formatTokenAmount(value)}</td>
      </tr>,
    );
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Required Amount</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};
