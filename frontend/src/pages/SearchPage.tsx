import { useSearchRestaurants } from "@/api/restaurantApi";
import PaginationSelector from "@/components/PaginationSelector";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchBar from "@/components/shared/SearchBar";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
};

export default function SearchPage() {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
  });

  const { results, isPending } = useSearchRestaurants(searchState, city);

  const setPage = (page: number) => {
    setSearchState((prev) => ({
      ...prev,
      page,
    }));
  };

  const setSearchQuery = (searchFormdata: SearchState) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormdata.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
      page: 1,
    }));
  };

  if (!results?.data || !city) {
    return <span> No results found</span>;
  }

  if (isPending) {
    return <span> Loading...</span>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">insert cuisines list here</div>

      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by cuisine or Restaurant name"
          onReset={resetSearch}
        />
        <SearchResultInfo total={results.pagination.total} city={city} />

        {results.data.map((restaurant, index) => (
          <SearchResultCard key={index} restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
