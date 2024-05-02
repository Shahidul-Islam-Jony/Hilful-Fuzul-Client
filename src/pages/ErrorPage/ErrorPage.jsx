import { Link, useRouteError } from 'react-router-dom';
import errorImg from '../../assets/404.jpg'

const ErrorPage = () => {
    const error = useRouteError();
    // console.log(error);
    return (
        <div>
            {
                error?.status === 404 && <div className='text-center relative'>
                    <img src={errorImg} className=' h-screen w-full' alt="" />
                    <div className='absolute bottom-16 right-1/3'>
                        <p className='text-5xl font-bold text-center mt-4'>Page Not Found</p>
                        <Link className='btn btn-primary hover:bg-blue-600 mt-4 px-16' to='/'>Go Back to home</Link>
                    </div>
                </div>
            }
        </div>
    );
};

export default ErrorPage;