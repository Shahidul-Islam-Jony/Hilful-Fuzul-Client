import { Typewriter } from "react-simple-typewriter";

import banner1 from "../../../assets/crying child/crying child1.jpg";
import banner2 from "../../../assets/crying child/crying child 2.jpg";
import banner3 from "../../../assets/crying child/crying child 3.png";
import banner4 from "../../../assets/crying child/crying child 4.png";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const Banner = () => {
  return (
    <div className="relative">
      <div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src={banner1}
              className="h-[500px] w-11/12 bg-cover md:w-2/3 rounded-lg"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src={banner2}
              className="h-[500px] w-11/12 bg-cover md:w-2/3 rounded-lg"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src={banner3}
              className="h-[500px] w-11/12 bg-cover md:w-2/3 rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={banner4}
              className="h-[500px] w-11/12 bg-cover md:w-2/3 rounded-lg"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Type Writter */}
      <div className="absolute z-50 top-1/3 md:top-1/2 md:left-28 lg:left-1/3">
        <p className="text-white text-center bg-black bg-opacity-50 p-1 rounded-sm text-xl font-medium">
          <Typewriter
            words={[
              "অসহায় গরিবের দিকে আপনার সাহায্যের হাত বাড়িয়ে দিন ।",
              "আপনার যেটুকু আছে সেইটুকুই দিয়ে অসহায় মানুষের পাশে দাঁড়ান ।",
            ]}
            typeSpeed={70}
            cursor
            cursorStyle="_"
            deleteSpeed={50}
            delaySpeed={1000}
            loop={Infinity}
          />
        </p>
      </div>
    </div>
  );
};

export default Banner;
