import "./table.css";
import { useSortableTable } from "../../hooks/useSortableTable";
import { withRoleBasedRendering } from "../role-based";

type Props = {};
export const SortableTable: React.FC<Props> = () => {
  const {
    searchTerm,
    handleSearch,
    handleSort,
    columns,
    sortDirection,
    sortedColumn,
    data,
    error,
  } = useSortableTable({ url: "lists?pagination[limit]=100" });
  if (error) {
    return (
      <div>
        <h1>Error Can Handeled</h1>
      </div>
    );
  }
  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        className="search"
      />
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.name}
                  onClick={() => handleSort(column.name)}
                  className={`sortable-header ${
                    sortedColumn === column.name ? "active" : ""
                  }`}
                >
                  {column.label}
                  {column.sortable && (
                    <span className={`sort-icon ${sortDirection}`}></span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={column.name} data-label={column.label}>
                    {row.attributes[column.name]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export const EditorOnlyComponent = withRoleBasedRendering(["Editor"])(
  SortableTable
);
