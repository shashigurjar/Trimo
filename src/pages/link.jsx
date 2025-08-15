import DeviceStats from "@/components/device-stats";
import Location from "@/components/location-stats";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {UrlState} from "@/context";
import {getClicksForUrl} from "@/db/apiClicks";
import {deleteUrl, getUrl} from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import {Copy, Download, LinkIcon, Trash} from "lucide-react";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {BarLoader, BeatLoader} from "react-spinners";

const LinkPage = () => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const navigate = useNavigate();
  const {user} = UrlState();
  const {id} = useParams();
  const { loading, data: url, fn, error } = useFetch(getUrl, {id, user_id: user?.id});
  const { loading: loadingStats, data: stats, fn: fnStats } = useFetch(getClicksForUrl, id);
  const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl, id);

  useEffect(() => { fn(); }, []);
  useEffect(() => { if (!error && loading === false) fnStats(); }, [loading, error]);

  if (error) navigate("/dashboard");

  let link = url?.custom_url ? url?.custom_url : url?.short_url;

  return (
    <div className="min-h-screen bg-gray-950 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {(loading || loadingStats) && (
          <BarLoader 
            width={"100%"} 
            color="#3b82f6" 
            height={2}
            cssOverride={{ backgroundColor: 'rgba(31, 41, 55, 0.5)' }}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-1/2 bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-6 break-all">
              {url?.title}
            </h1>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">Short URL</p>
                <a
                  href={`http://localhost:5173/${link}`}
                  target="_blank"
                  className="text-xl sm:text-2xl text-blue-400 font-medium hover:underline break-all"
                >
                  https://trimrr.in/{link}
                </a>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Original URL</p>
                <a
                  href={url?.original_url}
                  target="_blank"
                  className="flex items-center gap-2 text-gray-300 hover:text-blue-400 hover:underline break-all"
                >
                  <LinkIcon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{url?.original_url}</span>
                </a>
              </div>

              <p className="text-sm text-gray-500">
                Created: {new Date(url?.created_at).toLocaleString()}
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
                  onClick={() => navigator.clipboard.writeText(`https://trimrr.in/${link}`)}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
                  onClick={downloadImage}
                >
                  <Download className="mr-2 h-4 w-4" />
                  QR Code
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => fnDelete().then(() => navigate("/dashboard"))}
                  disabled={loadingDelete}
                >
                  {loadingDelete ? (
                    <BeatLoader size={8} color="#ffffff" />
                  ) : (
                    <>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </>
                  )}
                </Button>
              </div>

              {url?.qr && (
                <div className="mt-6 p-4 bg-gray-800 rounded-lg inline-block">
                  <img
                    src={url?.qr}
                    className="w-40 h-40 object-contain"
                    alt="QR Code"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2">
            <Card className="bg-gray-900/50 border-gray-800 h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-100">Link Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {stats && stats.length ? (
                  <>
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-gray-400 text-sm font-medium">Total Clicks</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-blue-400">{stats?.length}</p>
                      </CardContent>
                    </Card>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-200">Location Data</h3>
                      <Location stats={stats} />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-200">Device Information</h3>
                      <DeviceStats stats={stats} />
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    {loadingStats ? "Loading statistics..." : "No data available yet"}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkPage;