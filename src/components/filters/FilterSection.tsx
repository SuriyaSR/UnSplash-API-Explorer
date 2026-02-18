interface Props {
  label: string;
  children: React.ReactNode;
}

const FilterSection = ({ label, children }: Props) => (
  <div>
    <label className="font-medium block mb-2">{label}</label>
    {children}
  </div>
);

export default FilterSection;
