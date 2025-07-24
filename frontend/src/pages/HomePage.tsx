import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import landingImage from "@/assets/landing.png";
import appDownloadImage from "@/assets/appDownload.png";

const HomePage = () => {
  return (
    // w-full md:w-10/12 lg:9/12
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 items-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
        <div className="w-2/3 flex justify-between py-3 px-2 rounded-3xl border border-b-stone-200">
          <div className="flex items-center gap-2">
            <Search className="size-8 text-orange-500" />
            <span className="text-lg text-stone-400">
              Search by City or Town
            </span>
          </div>
          <Button className="text-white bg-orange-500 rounded-3xl">
            Search
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeway even faster!
          </span>
          <span>
            Download the Foodies App for faster ordering and personalized
            recomendations.
          </span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
