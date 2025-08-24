import React from "react";

interface DebugInfoProps {
  queryParams: Record<string, string>;
  debug?: boolean;
}

export const DebugInfo: React.FC<DebugInfoProps> = ({
  queryParams,
  debug = false,
}) => {
  if (!debug) return null;

  return (
    <div className="px-6 pt-2">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs font-medium text-blue-800 mb-2">
          📋 Información adicional detectada:
        </p>
        <div className="space-y-1">
          {Object.entries(queryParams).map(([key, value]) => (
            <p key={key} className="text-xs text-blue-700">
              <span className="font-medium">{key}:</span> {value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
