import * as Icon1 from "react-icons/bi";
import * as Icon3 from "react-icons/hi2";
import * as Icon2 from "react-icons/io5";

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Mahuari Pachhim Tola, Siwan, Bihar-841227",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+91 9876543210",
  },
];

const ContactDetails = () => {
  return (
    <div className="flex min-w-0 max-w-full flex-col gap-4 rounded-xl bg-richBlack-800 p-3 sm:gap-6 sm:p-4 lg:p-6">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
        return (
          <div
            className="flex min-w-0 flex-col gap-1 p-2 text-sm text-richBlack-200 sm:p-3"
            key={i}
          >
            <div className="flex min-w-0 flex-row items-center gap-2 sm:gap-3">
              <Icon className="shrink-0" size={24} />
              <h2 className="text-base font-semibold text-richBlack-5 sm:text-lg">
                {ele?.heading}
              </h2>
            </div>
            <p className="font-medium">{ele?.description}</p>
            <p className="break-words font-semibold">{ele?.details}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ContactDetails;
