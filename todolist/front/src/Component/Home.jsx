import React from 'react'

function Home() {
  return (
    <>
    <div className='flex flex-col justify-center items-center gap-5 min-h-screen'>
        <h1 className='font-bold text-3xl text-center w-full'>well-come to the <span className='text-green-500'>AB_SHARMA WEB 2.3</span> </h1>
        <p className='text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis fugit officiis ipsum veniam tempore qui natus sunt commodi vitae magnam? Vel pariatur ab quisquam reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, vel vitae natus ex cupiditate explicabo id. Omnis cum ipsam consequuntur non ipsum in officiis eligendi.</p>

        <button className='bg-green-500 p-3 rounded-full font-bold hover:bg-green-400'>
            learn-more
        </button>
    </div>
    </>
  )
}

export default  Home