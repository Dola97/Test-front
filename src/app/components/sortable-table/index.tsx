import { DATATABLE } from "../../constants/data";
import "./table.css";
import useSortableTable from "../../hooks/useSortableTable";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
type Column = {
  name: string;
  label: string;
  sortable: boolean;
};

type RowData = {
  id: string;
  [key: string]: any;
};
type SortDirection = "asc" | "desc" | "";

type TableData = {
  [key: string]: any;
};

type Props = {};
export const SortableTable: React.FC<Props> = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortedColumn, setSortedColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("lists?pagination[limit]=100");
        console.log("res", response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleSort = (columnName: string) => {
    if (columnName === sortedColumn) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortedColumn(columnName);
      setSortDirection("asc");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.attributes.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    const compareA = a.attributes[sortedColumn] || ""; // Set default value for undefined or null
    const compareB = b.attributes[sortedColumn] || "";

    if (sortDirection === "asc") {
      return compareA.localeCompare(compareB);
    } else {
      return compareB.localeCompare(compareA);
    }
  });

  const columns: Column[] =
    data && data.length > 0 && data[0]?.attributes
      ? Object.keys(data[0].attributes).map((key) => ({
          name: key,
          label: key,
          sortable: true,
        }))
      : [];
  console.log("sor", sortedData);
  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
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
            {sortedData.map((item) => (
              <tr key={item.id}>
                <td>{item.attributes.name}</td>
                <td>{item.attributes.description}</td>
                <td>{item.attributes.active}</td>
                <td>{item.attributes.createdAt}</td>

                <td>{item.attributes.updatedAt}</td>
                <td>{item.attributes.publishedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
