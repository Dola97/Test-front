import { useState, useEffect } from "react";
import { api } from "../api/api";

type SortDirection = "asc" | "desc";

type TableData = {
  [key: string]: any;
};

type SortableTableHook = {
  data: TableData[];
  searchTerm: string;
  sortedColumn: string;
  sortDirection: SortDirection;
  handleSort: (columnName: string) => void;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setData: (data: TableData[]) => void;
};

const useSortableTable = (
  initialData: TableData[],
  initialUrl: string,
  initialSearchTerm = "",
  initialSortedColumn = "",
  initialSortDirection: SortDirection = "asc"
): SortableTableHook => {
  const [data, setData] = useState<TableData[]>(initialData);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [sortedColumn, setSortedColumn] = useState<string>(initialSortedColumn);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>(initialSortDirection);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(initialUrl);
        console.log("res", response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [initialUrl]);

  const handleSort = (columnName: string): void => {
    if (columnName === sortedColumn) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortedColumn(columnName);
      setSortDirection("asc");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filteredData: TableData[] = initialData?.filter((item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedData: TableData[] = filteredData?.sort((a, b) => {
      const compareA = a[sortedColumn] || "";
      const compareB = b[sortedColumn] || "";

      if (sortDirection === "asc") {
        return compareA.localeCompare(compareB);
      } else {
        return compareB.localeCompare(compareA);
      }
    });

    setData(sortedData);
  }, [initialData, searchTerm, sortedColumn, sortDirection]);

  return {
    data,
    searchTerm,
    sortedColumn,
    sortDirection,
    handleSort,
    handleSearch,
    setData,
  };
};

export default useSortableTable;
