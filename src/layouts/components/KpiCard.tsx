import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface KpiCardProps {
  title: string;
  change: string;
  value: string;
  color: string;
  icon: 'up' | 'down';
}

export default function KpiCard({ title, change, value, color, icon }: KpiCardProps) {
  const Icon = icon === 'up' ? FiChevronUp : FiChevronDown;
  const iconColor = color === 'green' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="shadow-sm border border-gray-200 rounded-lg bg-white">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <p className="font-medium text-xs text-gray-600">
            {title}
          </p>
          <div className="flex items-center gap-1">
            <Icon strokeWidth={3} className={`w-4 h-4 ${iconColor}`} />
            <p className={`font-medium text-xs text-${color}-500`}>
              {change}
            </p>
          </div>
        </div>
        <p className="mt-1 font-bold text-2xl text-gray-800">
          {value}
        </p>
      </div>
    </div>
  );
}
