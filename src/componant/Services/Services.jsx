import {
  FaCarSide,
  FaCheckCircle,
  FaHeadphonesAlt,
  FaWallet,
} from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa6";

const ServicesData = [
  {
    id: 1,
    icon: (
      <FaHandHoldingHeart
        className="text-4xl md:text-5xl 
        text-primary"
      />
    ),
    title: "افضل جوده",
    description: "افضل جوده لأفضل عميل",
  },

  {
    id: 2,
    icon: (
      <FaWallet
        className="text-4xl md:text-5xl 
        text-primary"
      />
    ),
    title: "دفع آمن",
    description: "جميع المدفوعات آمنة",
  },
  {
    id: 3,
    icon: (
      <FaHeadphonesAlt
        className="text-4xl md:text-5xl 
        text-primary"
      />
    ),
    title: "دعم فني 24/7",
    description: "دعم تقني على مدار الساعة طوال أيام الأسبوع",
  },
];


const Services = () => {
  return (
    <div>
      <div className="container my-14 md:my-20" style={{ textAlign:"center" }}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 gap-y-8">
          {ServicesData.map((data) => (
            <div
              key={data}
              className="flex flex-col items-center 
            sm:flex-row gap-4"
            style={{ justifyContent:"center",alignItems:"center" }}
            >
              {data.icon}
              <div>
                <h1 className="lg:text-xl font-bold">{data.title}</h1>
                <h1 className="text-gray-400 text-sm">{data.description}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
