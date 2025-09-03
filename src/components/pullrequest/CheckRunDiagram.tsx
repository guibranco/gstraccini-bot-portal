import { useState } from "react";
import { BulletDiagram } from "../BulletDiagram";
import { X } from "lucide-react";
import type { Event } from "../../types";

interface CheckRunDiagramProps {
  events: Event[];
}

export function CheckRunDiagram({ events }: CheckRunDiagramProps) {
  const [selectedPayload, setSelectedPayload] = useState<Record<
    string,
    unknown
  > | null>(null);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Check Run Timeline
        </h2>
        <BulletDiagram
          events={events}
          onViewPayload={(payload) => setSelectedPayload(payload)}
        />
        {selectedPayload && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Event Payload
              </h3>
              <button
                onClick={() => setSelectedPayload(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                {JSON.stringify(selectedPayload, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
