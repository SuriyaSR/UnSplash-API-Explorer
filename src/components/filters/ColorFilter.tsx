import { type Filters, COLOR_OPTIONS, type Color} from "@/types/unsplash";
import FilterSection from "./FilterSection";

interface Props {
  value?: Color;
  onChange: (c: Filters["color"]) => void;
}

const colorMap: Record<Color, string> = {
  black: "bg-black",
  white: "bg-white border",
  yellow: "bg-yellow-400",
  orange: "bg-orange-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
  magenta: "bg-pink-500",
  green: "bg-green-500",
  teal: "bg-teal-500",
  blue: "bg-blue-500",
  black_and_white: "bg-gradient-to-r from-black to-white"
};

const ColorFilter = ({ value, onChange }: Props) => (
  <FilterSection label="Color">
    <div className="flex gap-2 flex-wrap">
      {COLOR_OPTIONS.map(c => (
        <button  type="button" key={c}
          onClick={() => onChange(c)} title={c}
          className={` w-8 h-8 border rounded-full transition-transform ${colorMap[c]}
            ${value === c ? "ring-2 ring-black scale-110" : ""}`}/>
      ))}
    </div>
  </FilterSection>
);


export default ColorFilter;
