import {storeClicks} from "@/db/apiClicks";
import {getLongUrl} from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {BarLoader} from "react-spinners";

const RedirectLink = () => {
  const {id} = useParams();
  const {loading, data, fn} = useFetch(getLongUrl, id);
  const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => { fn(); }, []);
  useEffect(() => { if (!loading && data) fnStats(); }, [loading]);

  if (loading || loadingStats) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <BarLoader 
            width={"100%"} 
            color="#3b82f6" 
            height={2}
            cssOverride={{ backgroundColor: 'rgba(31, 41, 55, 0.5)' }}
          />
          <p className="mt-4 text-gray-400">Redirecting to your destination...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default RedirectLink;