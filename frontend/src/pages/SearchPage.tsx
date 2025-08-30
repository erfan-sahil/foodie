import { useSearchRestaurants } from "@/api/restaurantApi";
import { useParams } from "react-router-dom";

export default function SearchPage() {
  const { city } = useParams();
  const { results, isPending } = useSearchRestaurants(city);
  return <div>User searched for {city}</div>;
}
