import Image from 'next/image'

export const CityCard = () => {
  return (
    <>
      <div className="relative h-96 md:h-screen">
        <Image src="/images/city.png" alt="city" className="object-cover h-full w-full" width={1500} height={2000} />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-80">
          <div className="rounded-xl px-4 py-4 max-w-lg mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">The World Is Constantly Evolving</h1>
          </div>
        </div>
      </div>
    </>
  )
}
