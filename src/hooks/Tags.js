import { h, createContext } from "preact";
import qs from "qs";
import { useEffect, useState, useContext } from "preact/hooks";
import { getTags } from "../services/campaign";

const TagsContext = createContext({});

export function TagsProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState(
    decodeURIComponent(
      qs.parse(window.location.search.slice(1))?.filters?.tag
    ) || ""
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      const tags = await getTags();
      setTags(tags);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const encodedParams = `?filters[tag]=${encodeURIComponent(activeTag)}`;
    window.history.pushState({ path: encodedParams }, "", encodedParams);
  }, [activeTag]);

  return (
    <TagsContext.Provider value={{ loading, tags, activeTag, setActiveTag }}>
      {children}
    </TagsContext.Provider>
  );
}

export const useTags = () => useContext(TagsContext);
