import Image from 'next/image'

export const CardOne = () => {
  return (
    <>
      <main className="flex flex-col justify-center items-center min-h-screen px-4 md:px-8 py-6">
        <div className="relative w-full md:w-96 h-96 md:h-80">
          <Image
            src="/images/gps.png"
            alt="city"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="text-center mt-8">
          <h1 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500">
            Find Innovative Ways To Conquer All Your Problems
          </h1>
          <p className="text-white font-semibold text-xl mt-6">
            We are a team of highly skilled developers
          </p>
          <p className="text-white font-semibold text-xl">
            who are passionate about overcoming obstacles and building
            innovative solutions.
          </p>
        </div>
        <div className="mt-8">
          <button className="bg-blue-400 hover:bg-blue-500 text-black rounded-md p-2">
            Get Started
          </button>
        </div>
      </main>
    </>
  )
}

export default CardOne
