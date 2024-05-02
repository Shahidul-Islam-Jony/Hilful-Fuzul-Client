import './FooterStyle.css'

const Footer = () => {
    return (
        <div className='mt-96'>

            <footer className="flex flex-col md:flex-row text-white justify-between bg-blue-450">
                {/* waves start*/}
                <div className="waves">
                    <div className="wave" id="wave1"></div>
                    <div className="wave" id="wave2"></div>
                    <div className="wave" id="wave3"></div>
                    <div className="wave" id="wave4"></div>
                </div>
                {/* waves end */}

                <div className='w-full lg:pl-24'>
                    <img src='Hilfulfuzul.png' className='w-20 h-20 rounded-full' alt="Lifecare logo" />
                    <p>Hilful Fuzul<br />Re-established March 24, 2024</p>
                </div>
                <div className='flex flex-col w-full'>
                    <h6 className="footer-title">Services</h6>
                    <a className="">Establish Peace</a>
                    <a className="">Helping Poor People</a>
                    <a className="">Developmental work</a>
                </div>
                <div className='flex flex-col w-full'>
                    <h6 className="footer-title">Company</h6>
                    <a className="">About Us</a>
                    <a className="">Contact Us</a>
                    <a className="">Become a member</a>
                </div>
                <div className='flex flex-col w-full'>
                    <h6 className="footer-title">Legal</h6>
                    <a className="">Terms of use</a>
                    <a className="">Privacy policy</a>
                    <a className="">Cookie policy</a>
                </div>
            </footer>
        </div>
    );
};

export default Footer;