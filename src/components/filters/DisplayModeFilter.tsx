import { motion } from "framer-motion";
import FilterSection from "./FilterSection";

interface Props {
  value: boolean; // true = Infinite Scroll
  onChange: (v: boolean) => void;
}

const DisplayModeFilter = ({ value, onChange }: Props) => {
  return (
    <FilterSection label="Display Mode">
      <div className="relative flex items-center bg-blue-200
                    border border-gray-300 rounded-full p-1 w-[280px]">
        {/* Animated pill */}
        <motion.div
            layout
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 30
            }}
            className="absolute top-1 bottom-1 w-1/2 rounded-full bg-white shadow-md"
            style={{left: value ? "4px" : "50%"}} />

        {/* Infinite Scroll */}
        <button type="button" onClick={() => onChange(true)}
            className="relative z-10 flex items-center
            justify-center gap-2 w-1/2 py-2 text-md font-medium">          
          Infinite Scroll
        </button>

        {/* Pagination */}
        <button type="button" onClick={() => onChange(false)}
            className="relative z-10 flex items-center
            justify-center gap-2 w-1/2 py-2 text-md font-medium">
            Pagination
        </button>
      </div>
    </FilterSection>
  );
};

export default DisplayModeFilter;
