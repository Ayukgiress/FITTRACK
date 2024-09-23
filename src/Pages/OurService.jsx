import React from 'react'

const OurService = () => {
  return (
    <div className=' bg-customGradient text-white flex items-center justify-center flex-col bg-#090101'>
      <h1 className='text-2xl mb-8'>Our Services</h1>

      <div className='flex flex-wrap items-center justify-center gap-10 m-5'>

        <div className='flex w-80 h-80'>
          <div 
            className='flex flex-col justify-between p-4 w-3/5 h-full' 
            style={{
              background: 'linear-gradient(to right, #4d210e, #191919)' 
            }}
          >
            <h1 className='mb-0 text-lg'>Building Muscles</h1> 
            <h3 className='text-sm  leading-tight'>
              Develop strength and define <br />
              your muscles with a tailored <br />
              program designed to help <br />
              you gain lean mass efficiently. <br />
              Click on the button below and <br />
              start your journey right now. <br />
              Don't miss the chance.
            </h3>
          </div>
          <img 
            src="src/assets/images/pexels-mike-jones-8874913-Photoroom.png" 
            alt="img" 
            className='w-2/5 h-full object-cover'
            style={{
              backgroundColor: '#191919' 
            }}
          />
        </div>

        <div className='flex w-80 h-80'>
          <div 
            className='flex flex-col justify-between p-4 w-3/5 h-full' 
            style={{
              background: 'linear-gradient(to right, #4d210e, #191919)' 
            }}
          >
            <h1 className='mb-0 text-lg'>Training at Home</h1> 
            <h3 className='text-sm  leading-tight'>
              Develop strength and define <br />
              your muscles with a tailored <br />
              program designed to help <br />
              you gain lean mass efficiently. <br />
              Click on the button below and <br />
              start your journey right now. <br />
              Don't miss the chance.
            </h3>
          </div>
          <img 
            src="src/assets/images/pexels-nappy-935965-Photoroom.png" 
            alt="img" 
            className='w-2/5 h-full object-cover'
            style={{
              backgroundColor: '#191919' 
            }}
          />
        </div>

        <div className='flex w-80 h-80'>
          <div 
            className='flex flex-col justify-between p-4 w-3/5 h-full' 
            style={{
              background: 'linear-gradient(to right, #4d210e, #191919)' 
            }}
          >
            <h1 className='mb-0 text-lg'>Gym Plan</h1> 
            <h3 className='text-sm leading-tight'>
              Develop strength and define <br />
              your muscles with a tailored <br />
              program designed to help <br />
              you gain lean mass efficiently. <br />
              Click on the button below and <br />
              start your journey right now. <br />
              Don't miss the chance.
            </h3>
          </div>
          <img 
            src="src/assets/images/pexels-mike-jones-8875298-Photoroom.png" 
            alt="img" 
            className='w-2/5 h-full object-cover'
            style={{
              backgroundColor: '#191919' 
            }}
          />
        </div>

        
      </div>
    </div>
  )
}

export default OurService
