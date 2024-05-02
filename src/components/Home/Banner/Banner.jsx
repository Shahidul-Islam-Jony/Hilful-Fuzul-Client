import bg1 from '../../../assets/banner/helpless-children.jpg'
import { Typewriter } from 'react-simple-typewriter'

const Banner = () => {
    return (
        <div className='relative'>
            <div>
                <img src={bg1} className='w-full md:h-[450px] rounded-md' alt="" />
            </div>
            <div className='absolute top-1/3 md:top-1/2 md:left-1/3'>
                {/* <p className='text-white text-center text-xl font-medium'>অসহায় গরিবের দিকে আপনার সাহায্যের হাত বাড়িয়ে দিন ।<br /> আপনার যেটুকু আছে সেইটুকুই দিয়ে অসহায় মানুষের পাশে দাঁড়ান ।</p> */}
                <p className='text-white text-center text-xl font-medium'>
                    <Typewriter
                        words={['অসহায় গরিবের দিকে আপনার সাহায্যের হাত বাড়িয়ে দিন ।', 'আপনার যেটুকু আছে সেইটুকুই দিয়ে অসহায় মানুষের পাশে দাঁড়ান ।']}
                        typeSpeed={70}
                        cursor
                        cursorStyle='_'
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