import {useEffect, useState} from "react";
import {BarLoader} from "react-spinners";
import {Filter, Search} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {CreateLink} from "@/components/create-link";
import LinkCard from "@/components/link-card";
import Error from "@/components/error";
import useFetch from "@/hooks/use-fetch";
import {getUrls} from "@/db/apiUrls";
import {getClicksForUrls} from "@/db/apiClicks";
import {UrlState} from "@/context";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {user} = UrlState();
  const {loading, error, data: urls, fn: fnUrls} = useFetch(getUrls, user.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  return (
    <div className="min-h-screen bg-gray-950 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {(loading || loadingClicks) && (
          <BarLoader 
            width={"100%"} 
            color="#3b82f6" 
            height={2}
            cssOverride={{
              backgroundColor: 'rgba(31, 41, 55, 0.5)',
            }}
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-medium">Links Created</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-400">{urls?.length || 0}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm font-medium">Total Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-400">{clicks?.length || 0}</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">My Links</h1>
            <p className="text-gray-500 text-sm mt-1">
              {filteredUrls?.length || 0} {filteredUrls?.length === 1 ? 'link' : 'links'} found
            </p>
          </div>
          <CreateLink />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <Input
            type="text"
            placeholder="Search your links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-900 border-gray-800 focus:border-blue-500 text-gray-200 placeholder-gray-600"
          />
          <Filter className="absolute top-2 right-3 p-1 text-gray-500 hover:text-blue-400 cursor-pointer transition-colors" />
        </div>

        {error && <Error message={error?.message} />}

        <div className="grid gap-4">
          {(filteredUrls || []).map((url, i) => (
            <LinkCard key={i} url={url} fetchUrls={fnUrls} />
          ))}
          
          {filteredUrls?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No links found. Create your first link!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;