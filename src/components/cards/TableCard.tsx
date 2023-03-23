import Image from 'next/image'

export const TableCard = () => {
    return (

            <>
            <div className="grid grid-cols gap-4 justify-center mt-20">
                      <h1 className="text-5xl font-bold text-white text-center">Our Team Never Stops</h1>
                        <p className="text-2xl text-white text-center mb-10">It Is The People At DevGru That Make Us Who We Are...</p>
                <div className="flex flex-col items-center justify-center bg-zinc-900 text-5xl font-black py-6 px-4 rounded-2xl">
                <Image src="/images/team.png" alt="city"
                    height={1000}
                    width={1500}
                />
                {/* <div className="absolute top-120 left-0 w-full h-full flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center bg-zinc-900 rounded-xl px-4 py-4 bg-opacity-80">
                    <h1 className="text-5xl font-bold text-white">The World Is Constantly Evolving</h1>
                        <p className="text-2xl text-white">Let Us Help Build The Future You Want...</p>
                        </div>
                </div> */}
                </div>
            </div>
        </>
    )
}


