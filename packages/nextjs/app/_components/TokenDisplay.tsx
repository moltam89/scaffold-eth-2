import React from "react";
import { TokenDetails } from "~~/types/types";

interface TokenDisplayProps {
  token: TokenDetails;
}

export const TokenDisplay = ({ token }: TokenDisplayProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="avatar">
        <div className="w-8 h-8 rounded-full">
          <img src={token.imgSrc} alt="Token Icon" />
        </div>
      </div>
      <span className="text-sm font-medium">{token.name}</span>
    </div>
  );
};
