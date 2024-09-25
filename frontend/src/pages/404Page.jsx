import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<div
			className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white'
			style={{ backgroundImage: `url('/404.png')` }}
		>
			<header className='absolute top-0 left-0 p-4 bg-black w-full '>
				<Link to={"/"}>
					<img src='/netflix-logo.png' alt='Netflix' className='h-8' />
				</Link>
			</header>
			<main className='flex flex-col gap-10 items-center text-center error-page--content z-10'>
				<h1 className='text-7xl font-semibold'>Lost your way?</h1>
				<p className='text-2xl'>
					{`Sorry, we can't find that page. You'll find lots to explore on the home page.`}
				</p>
				<Link to={"/"} className='text-xl bg-white text-black py-2 px-5 rounded font-bold hover:bg-gray-400'>
					Netflix Home
				</Link>
                <span className="text-3xl text-gray-300 border-l-2 border-red-700 p-4 max-w-sm mx-auto">
                    {`Error Code `} 
                    <strong>NSES-404</strong>
                </span>
			</main>
		</div>
	);
};
export default NotFoundPage;