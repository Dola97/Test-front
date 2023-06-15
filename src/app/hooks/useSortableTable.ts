import { useEffect, useState } from "react";
import { api } from "../api/api";

type Column = {
  name: string;
  label: string;
  sortable: boolean;
};

type SortDirection = "asc" | "desc" | "";

type TableData = {
  [key: string]: any;
};

type UseSortableTableProps = {
  url: string;
};

type UseSortableTableResult = {
  data: TableData[];
  searchTerm: string;
  sortedColumn: string;
  sortDirection: SortDirection;
  handleSort: (columnName: string) => void;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  columns: Column[];
  error: boolean;
};

export const useSortableTable = ({
  url,
}: UseSortableTableProps): UseSortableTableResult => {
  const [data, setData] = useState<TableData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortedColumn, setSortedColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(url);
        setData(response.data.data);
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, [url]);

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

  return {
    data: sortedData,
    searchTerm,
    sortedColumn,
    sortDirection,
    handleSort,
    handleSearch,
    columns,
    error,
  };
};
