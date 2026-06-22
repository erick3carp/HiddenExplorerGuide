export default function CategoryBadge({ category }) {
  return <span className={`badge ${category}`}>{category}</span>;
}
