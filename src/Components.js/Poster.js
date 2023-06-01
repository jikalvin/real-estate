import React from 'react';

import Search from '../Components.js/Search';



const Poster = () => {
  return (
    <section className='h-full max-h-[640px] mb-8 xl:mb-24 my-8'>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0'>
          <h1 className='text-4xl lg:text-[58px] font-semibold leading-none mb-6'>
            Find Houses For <span className='text-green-700 break-words'>
             Rent Without Stress
            </span>
          </h1>
          <p className='max-w-[480px] mb-8 text-red-700'>
          You are a few clicks away from finding your dream home, office space and mini cite
          </p>
        </div>
        <div className='hidden flex-1 lg:flex justify-end items-end'>
          <img src={Image} alt='' />
        </div>
      </div>
      <Search />
    </section>
  );
};

export default Poster;