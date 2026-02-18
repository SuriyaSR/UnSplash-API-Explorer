import type { UnsplashTopic } from "@/types/unsplash";
import FilterSection from "./FilterSection";

interface Props {
  topics: UnsplashTopic[];
  loading: boolean;
  value?: UnsplashTopic;
  onChange: (topic?: UnsplashTopic) => void;
}

export const TopicsFilter = ({
  topics,
  loading,
  value,
  onChange
}: Props) => (
  <FilterSection label="Topics">
    <select
      value={value?.slug ?? ""}
      onChange={e => {
        const slug = e.target.value;

        if (!slug) return onChange(undefined);

        const topic = topics.find(t => t.slug === slug);
        onChange(topic);
      }}
      className="w-full border rounded p-2"
    >
      <option value="">Any</option>

      {loading ? (
        <option>Loading...</option>
      ) : (
        topics.map(t => (
          <option key={t.id} value={t.slug}>
            {t.title}
          </option>
        ))
      )}
    </select>
  </FilterSection>
);
