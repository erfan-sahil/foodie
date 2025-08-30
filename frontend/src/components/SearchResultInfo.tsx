import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl fonnt-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} Restaurants found in {city}
        <Link
          className="text-blue-500 text-sm font-semibold underline cursor-pointer pl-1"
          to="/"
        >
          Change Location
        </Link>
      </span>
      <span>insert sort dropdown here</span>
    </div>
  );
};

export default SearchResultInfo;
