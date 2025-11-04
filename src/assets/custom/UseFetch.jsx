import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]); // 👈 start as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (isMounted) {
          setData(Array.isArray(result) ? result : []); // 👈 always array
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
        if (isMounted) {
          setData([]); // 👈 fallback safe value
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
