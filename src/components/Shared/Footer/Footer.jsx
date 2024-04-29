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
                    <img src='' className='w-20 h-20 rounded-full' alt="Lifecare logo" />
                    <p>LifeCare Ltd.<br />Providing medical services since 2024</p>
                </div>
                <div className='flex flex-col w-full'>
                    <h6 className="footer-title">Services</h6>
                    <a className="">Branding</a>
                    <a className="">Design</a>
                    <a className="">Marketing</a>
                    <a className="">Advertisement</a>
                </div>
                <div className='flex flex-col w-full'>
                    <h6 className="footer-title">Company</h6>
                    <a className="">About us</a>
                    <a className="">Contact</a>
                    <a className="">Jobs</a>
                    <a className="">Press kit</a>
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