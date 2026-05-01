import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];

const Plans = ["Paid memberships", "For students", "Business solutions"];

const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="w-full overflow-x-hidden bg-richBlack-800">
      
      {/* Main Footer */}
      <div className="mx-auto w-11/12 max-w-maxContent py-10 text-sm text-richBlack-400 sm:text-base">
        <div className="grid grid-cols-1 gap-10 border-b border-richBlack-700 pb-8 lg:grid-cols-2">
          
          {/* Left Section */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:border-r lg:border-richBlack-700 lg:pr-8">
            
            {/* Company */}
            <div>
              <img
                src={Logo}
                alt="logo"
                className="mb-4 w-32 object-contain"
              />

              <h1 className="text-lg font-semibold text-richBlack-50">
                Company
              </h1>

              <div className="mt-3 flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => (
                  <Link
                    key={i}
                    to={ele.toLowerCase()}
                    className="text-sm hover:text-richBlack-50"
                  >
                    {ele}
                  </Link>
                ))}
              </div>

              <div className="mt-4 flex gap-4 text-lg">
                <FaFacebook className="cursor-pointer hover:text-white" />
                <FaGoogle className="cursor-pointer hover:text-white" />
                <FaTwitter className="cursor-pointer hover:text-white" />
                <FaYoutube className="cursor-pointer hover:text-white" />
              </div>
            </div>

            {/* Resources */}
            <div>
              <h1 className="text-lg font-semibold text-richBlack-50">
                Resources
              </h1>

              <div className="mt-3 flex flex-col gap-2">
                {Resources.map((ele, index) => (
                  <Link
                    key={index}
                    to={ele.split(" ").join("-").toLowerCase()}
                    className="text-sm hover:text-richBlack-50"
                  >
                    {ele}
                  </Link>
                ))}
              </div>

              <h1 className="mt-6 text-lg font-semibold text-richBlack-50">
                Support
              </h1>

              <Link
                to="/help-center"
                className="mt-3 block text-sm hover:text-richBlack-50"
              >
                Help Center
              </Link>
            </div>

            {/* Plans */}
            <div>
              <h1 className="text-lg font-semibold text-richBlack-50">
                Plans
              </h1>

              <div className="mt-3 flex flex-col gap-2">
                {Plans.map((ele, index) => (
                  <Link
                    key={index}
                    to={ele.split(" ").join("-").toLowerCase()}
                    className="text-sm hover:text-richBlack-50"
                  >
                    {ele}
                  </Link>
                ))}
              </div>

              <h1 className="mt-6 text-lg font-semibold text-richBlack-50">
                Community
              </h1>

              <div className="mt-3 flex flex-col gap-2">
                {Community.map((ele, index) => (
                  <Link
                    key={index}
                    to={ele.split(" ").join("-").toLowerCase()}
                    className="text-sm hover:text-richBlack-50"
                  >
                    {ele}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {FooterLink2.map((ele, i) => (
              <div key={i}>
                <h1 className="text-lg font-semibold text-richBlack-50">
                  {ele.title}
                </h1>

                <div className="mt-3 flex flex-col gap-2">
                  {ele.links.map((link, index) => (
                    <Link
                      key={index}
                      to={link.link}
                      className="text-sm hover:text-richBlack-50"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-4 pb-6 text-sm text-richBlack-400 md:flex-row">
        
        {/* Policy Links */}
        <div className="flex flex-wrap justify-center gap-3 md:justify-start">
          {BottomFooter.map((ele, i) => (
            <Link
              key={i}
              to={ele.split(" ").join("-").toLowerCase()}
              className={`hover:text-richBlack-50 ${
                i !== BottomFooter.length - 1
                  ? "md:border-r md:border-richBlack-700 md:pr-3"
                  : ""
              }`}
            >
              {ele}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-center text-xs sm:text-sm md:text-right">
          Made with ❤️ Mukesh Kumar © 2026 Studynotion
        </p>
      </div>
    </div>
  );
};

export default Footer;