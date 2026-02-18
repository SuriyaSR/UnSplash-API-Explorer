import type { Filters } from "@/types/unsplash";
import FilterSection from "./FilterSection";

interface Props {
  value?: Filters["orientation"];
  onChange: (v: Filters["orientation"]) => void;
}

const OrientationFilter = ({ value, onChange }: Props) => (
  <FilterSection label="Orientation">
    <select
      value={value ?? ""}
      onChange={e =>
        onChange(e.target.value as Filters["orientation"])
      }
      className="w-full border rounded p-2"
    >
      <option value="">Any</option>
      <option value="landscape">Landscape</option>
      <option value="portrait">Portrait</option>
      <option value="squarish">Squarish</option>
    </select>
  </FilterSection>
);

export default OrientationFilter;
