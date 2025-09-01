import { useSearchRestaurants } from "@/api/restaurantApi";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchBar from "@/components/shared/SearchBar";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
};

export default function SearchPage() {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });

  const { results, isPending } = useSearchRestaurants(city);

  const setSearchQuey = (searchFormdata: SearchState) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormdata.searchQuery,
    }));
  };

  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
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
          onSubmit={setSearchQuey}
          placeHolder="Search by cuisine or Restaurant name"
          onReset={resetSearch}
        />
        <SearchResultInfo total={results.pagination.total} city={city} />

        {results.data.map((restaurant, index) => (
          <SearchResultCard key={index} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
