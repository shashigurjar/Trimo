import Login from "@/components/login";
import Signup from "@/components/signup";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {UrlState} from "@/context";
import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

function Auth() {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {isAuthenticated, loading} = UrlState();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            {searchParams.get("createNew")
              ? "Account Required"
              : "Welcome to Trimrr"}
          </h1>
          <p className="text-gray-500">
            {searchParams.get("createNew")
              ? "Sign in to create your short link"
              : "Manage your links with our platform"}
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full bg-gray-900/50 p-6 rounded-xl border border-gray-800">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="signup" 
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            >
              Signup
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-6">
            <Login />
          </TabsContent>
          <TabsContent value="signup" className="mt-6">
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Auth;