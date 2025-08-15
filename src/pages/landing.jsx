import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="my-6 sm:my-10 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-100">
            The only URL Shortener <br className="hidden sm:block" /> you'll ever need
          </h2>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
            Create short links, QR codes, and track your audience with our powerful platform.
          </p>
        </div>
        
        <form onSubmit={handleShorten} className="w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="url"
              placeholder="Enter your long URL here..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="flex-1 py-5 px-5 text-base bg-gray-900 border-gray-700 hover:border-blue-500 focus:border-blue-500 text-gray-100 placeholder-gray-500 rounded-lg transition-all duration-200"
            />
            <Button 
              type="submit" 
              className="py-5 px-7 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              Shorten URL
            </Button>
          </div>
        </form>

        <div className="my-14 w-full max-w-5xl rounded-lg overflow-hidden border border-gray-800 shadow-sm hover:shadow-lg transition-shadow duration-300">
          <img
            src="/banner1.jpg"
            className="w-full h-auto object-cover"
            alt="URL analytics dashboard preview"
          />
        </div>

        <div className="w-full max-w-3xl">
          <h3 className="text-2xl font-semibold text-gray-200 mb-8 text-center">Common Questions</h3>
          <Accordion type="multiple" collapsible className="space-y-3">
            <AccordionItem 
              value="item-1" 
              className="bg-gray-900/80 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline font-medium text-gray-200 hover:text-blue-400 group">
                <span className="group-hover:text-blue-400 transition-colors">How does the URL shortener work?</span>
              </AccordionTrigger>
              <AccordionContent className="px-5 py-3 text-gray-400">
                Our system generates a compact version of your long URL that redirects to the original address when accessed.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem 
              value="item-2" 
              className="bg-gray-900/80 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline font-medium text-gray-200 hover:text-blue-400 group">
                <span className="group-hover:text-blue-400 transition-colors">Is an account required?</span>
              </AccordionTrigger>
              <AccordionContent className="px-5 py-3 text-gray-400">
                Yes, accounts let you manage URLs, view analytics, and customize your short links.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem 
              value="item-3" 
              className="bg-gray-900/80 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline font-medium text-gray-200 hover:text-blue-400 group">
                <span className="group-hover:text-blue-400 transition-colors">What analytics are provided?</span>
              </AccordionTrigger>
              <AccordionContent className="px-5 py-3 text-gray-400">
                Track clicks, geographic locations, device types, and referral sources for each shortened URL.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;