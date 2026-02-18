import { useEffect, useRef, useState } from "react";
import type { UnsplashTopic } from "@/types/unsplash";

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

        const res = await fetch("/api/topics"); // your API
        const data: UnsplashTopic[] = await res.json();

        cachedTopics = data;
        setTopics(data);
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
