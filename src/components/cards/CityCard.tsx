'use client'

import Image from 'next/image'

export const CityCard = () => {
    return (
        <>
        <div className="h-20 w-full bg-gradient-to-t from-black to-neutral-900">
            </div>
        <div className="grid grid-cols gap-4">
                <Image src="/images/city.png" alt="city" className="object-cover h-screen"
                    height={2000}
                    width={1500}
                />
                <div className="absolute top-120 left-0 w-full h-full flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center bg-zinc-900 rounded-xl px-4 py-4 bg-opacity-80">
                    <h1 className="text-5xl font-bold text-white">The World Is Constantly Evolving</h1>
                        <p className="text-2xl text-white">Let Us Help Build The Future You Want...</p>
                        </div>
                </div>
                
            </div>
             <div className="h-20 w-full bg-gradient-to-b from-black to-neutral-900">
            </div>
        </>

 
    )
}

