import Image from 'next/image'
export const TableCard = () => {
    return (

        <>
            <div className="flex justify-center gap-10 my-20 mb-4 pb-10">
                <div className="w-1/3 bg-sky-900 opacity-60 h-88 rounded-2xl">
                    <Image src="/images/team.png" alt="city" className="w-50 h-50 mt-14 justify-center"
                        width={500}
                        height={500}
                    />
                    <h1 className="text-center text-white opacity-none text-2xl mt-4">Our Team</h1>
                    <p className="text-center text-white text-sm">The People Are What Makes Us The Best In the Industry.</p>
  </div>
  <div className="w-1/3 bg-sky-900 opacity-60 h-88 rounded-2xl pb-10"> <Image src="/images/native.png" alt="city" className="w-50 h-50 mt-4 justify-center"
                        width={500}
                        height={500}
                />
                 <h1 className="text-center text-white opacity-none text-xl">Our Methods</h1>
                    <p className="text-center text-white text-sm">We Ensure Every Step We Take Is Specifically Crafted To Optimize Output.</p></div>
</div>
        </>
    )
}

export default TableCard
