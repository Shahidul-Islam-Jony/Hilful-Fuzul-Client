import memberBack from "../../assets/images/hilful-fuzul-member-2.jpg";
import memberFront from "../../assets/images/hilful-fuzul member-1.jpg";

const ContactUs = () => {
  return (
    <div className="mt-24 w-[97%] mx-auto">
      <div>
        <p className="text-2xl font-bold text-center my-4 text-blue-600 underline italic">
          Some of Our members
        </p>
        <img
          src={memberFront}
          className="md:h-[500px] md:w-full rounded-lg"
          alt=""
        />
        <img
          src={memberBack}
          className="md:h-[500px] md:w-full rounded-lg mt-4"
          alt=""
        />
      </div>
      <div>
        <div className="text-xl mt-4">
          <p>
            <span className="font-bold">Contact / WhatsApp :</span>
            <a href="tel:+8801734845697" className="underline text-blue-600">01734845697</a>
          </p>
          <a href="mailto:hilful.fuzul.help@gmail.com">
            <span className="font-bold">Email : </span>
            <span className="underline text-blue-600">hilful.fuzul.help@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
