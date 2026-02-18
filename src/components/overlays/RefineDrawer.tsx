import { useState } from "react";
import type { Filters, UnsplashTopic } from "@/types/unsplash";
import { useTopics } from "@/hooks/useTopics";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

import OrientationFilter from "@/components/filters/OrientationFilter";
import { TopicsFilter } from "@/components/filters/TopicsFilter";
import ColorFilter from "@/components/filters/ColorFilter";
import DisplayModeFilter from "../filters/DisplayModeFilter";

interface RefineDrawerProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
}

const defaultFilters: Filters = {
  infiniteScroll: true,
  searchOrderBy: "relevant",
  topicOrderBy: "latest",
  topicFilter: undefined
};

const RefineDrawer = ({
  open,
  onClose,
  onApply
}: RefineDrawerProps) => {
  const [filters, setFilters] =
    useState<Filters>(defaultFilters);

  const { topics, loading } = useTopics(open);

  // ✅ Hooks
  useLockBodyScroll(open);
  useEscapeKey(onClose, open);

  const update = <K extends keyof Filters>(
    key: K,
    val: Filters[K]
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: val
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Drawer */}
      <div
        className="
          fixed top-0 right-0 h-full w-[340px]
          bg-white shadow-xl z-50
          flex flex-col
          animate-slideIn
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">
            Refine Results
          </h2>

          {/* ✅ Close Icon */}
          <button
            onClick={onClose}
            className="
              text-gray-500 hover:text-black
              text-xl font-semibold
            "
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">

          <DisplayModeFilter
            value={filters.infiniteScroll}
            onChange={v => update("infiniteScroll", v)}
          />

          <TopicsFilter
            topics={topics}
            loading={loading}
            value={filters.topicFilter}
            onChange={(topic?: UnsplashTopic) =>
              update("topicFilter", topic)}
          />

          <OrientationFilter
            value={filters.orientation}
            onChange={v => update("orientation", v)} 
          />          

          <ColorFilter
            value={filters.color}
            onChange={c => update("color", c)}
          />

        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={handleApply}
            className="
              w-full bg-black text-white
              py-2 rounded hover:bg-gray-800
            "
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default RefineDrawer;
