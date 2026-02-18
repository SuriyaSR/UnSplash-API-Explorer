import { useEffect, useRef, useState } from "react";
import type { UnsplashTopic } from "@/types/unsplash";
import { getTopics } from "@/api/api";

let cachedTopics: UnsplashTopic[] | null = null;

export const useTopics = (enabled: boolean) => {
  const [topics, setTopics] = useState<UnsplashTopic[]>([]);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!enabled || hasFetched.current) return;

    const fetchTopics = async () => {
      try {
        setLoading(true);

        // Return cached if exists
        if (cachedTopics) {
          setTopics(cachedTopics);
          return;
        }

        const response = await getTopics();
        const topicsData: UnsplashTopic[] = response.data;

        cachedTopics = topicsData;
        setTopics(topicsData);
        hasFetched.current = true;

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [enabled]);

  return { topics, loading };
};
