export const CardOne = () => {
    return (
<>
        <div className="grid-rows-2 grid-cols-2 text-center">
            <h1 className="mt-20 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl font-black">Find Innovative Ways To Conquer All Your Problems</h1>
                <p className="text-white align-middle text-bold text-2xl mt-10">We are a team of highly skilled developers</p>
            <p className="text-white align-middle text-bold text-2xl">
                who are passionate about overcoming obstacles and building innovative solutions.</p>
            </div>
            <div className="flex justify-center mt-10">
                <button className="bg-blue-400 text-black rounded-md p-2">Get Started</button>
        </div>
    </>
    );
};

export default CardOne;