/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
import poorPeopleFood from '../../../assets/DonationQuotes/poor people food giving.jpg'
import islamicFoodReserve from '../../../assets/DonationQuotes/islamic food serve.png'

const DonationQuotes = () => {
    return (
        <div className='w-11/12 my-10 mx-auto'>
            <div className='flex flex-col lg:flex-row gap-8 justify-between items-center'>
                <div>
                    <img className='rounded-lg' src={islamicFoodReserve} alt="" />
                </div>
                <div>
                    <p className='text-xl mb-8 font-medium md:w-[700px] text-center border-2 border-blue-600 rounded-lg p-4'>যখন কোনো ব্যক্তি মৃত্যুবরণ করে, তার সব আমল বন্ধ হয়ে যায়, তিনটি ব্যতীত, সদকায়ে জারিয়া, উপকারী জ্ঞান অথবা সত্কর্মশীল সন্তান যে তার জন্য দোয়া করে। ' (সহিহ মুসলিম শরিফ, হাদিস নম্বর-১৬৩১)</p>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row-reverse gap-8 justify-between items-center'>
                <div>
                    <img className='rounded-lg' src={poorPeopleFood} alt="" />
                </div>
                <div>
                    <p className='text-xl font-medium md:w-[700px] text-center border-2 border-blue-600 rounded-lg p-4'> যারা আল্লাহর পথে তাদের সম্পদ ব্যয় করে, তাদের উপমা একটি বীজের মত, যা উৎপন্ন করল সাতটি শীষ, প্রতিটি শীষে রয়েছে একশ’ দানা। আর আল্লাহ যাকে চান তার জন্য বাড়িয়ে দেন। আর আল্লাহ প্রাচুর্যময়, সর্বজ্ঞ।

                        সূরাঃ আল-বাকারা আয়াতঃ ২৬১</p>
                </div>
            </div>
        </div>
    );
};

export default DonationQuotes;