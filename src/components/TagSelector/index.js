import { h } from "preact";
import { useTags } from "../../hooks/Tags";
import styles from "./styles.module.css";

export function TagSelector() {
  const { tags, activeTag, setActiveTag } = useTags();

  const handleChange = ({ target }) => {
    setActiveTag(target.value);
  };

  return (
    <select
      value={activeTag}
      onChange={handleChange}
      className={styles.tagSelector}
    >
      <option value="">No filter</option>
      {tags.map((tag) => (
        <option key={tag.id} value={tag.value}>
          {tag.value}
        </option>
      ))}
    </select>
  );
}
