'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

interface CarouselProps {
  imageUrl: string;
  preferences: string[];
}

const Carousel = ({ imageUrl, preferences }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    // TODO -set max width for image
    <div key='image' className='h-48'>
      {imageUrl ? (
        <Image src={imageUrl} alt='Food Image' fill />
      ) : (
        <>
          <Separator />
          <ImageIcon className='text-neutral-400 mx-auto mt-14' size={30} />
        </>
      )}
    </div>,
    <div key='details' className='h-48 p-2 pt-0'>
      <Separator className='mb-2' />
      <h2 className='text-lg text-primary-600 font-semibold'>Attributes</h2>
      {preferences.length !== 0 ? (
        <div className='mt-3 flex gap-1'>
          {preferences.map((pref) => (
            <span
              key={pref}
              className='rounded-full border text-primary-600 border-primary-600 py-0.5 px-3 text-sm'
            >
              {pref}
            </span>
          ))}
        </div>
      ) : (
        <p className='text-sm text-center text-primary-600 mt-8'>
          no data available
        </p>
      )}
    </div>,
  ];

  const goToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // TODO - npm install react-swipeable
  // TODO - fancier buttons
  return (
    <div className='relative group'>
      {renderCurrentPage()}
      <div className='absolute -top-3 right-0 flex space-x-1.5 mr-2'>
        <div className='flex space-x-1.5'>
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-1.5 rounded-full cursor-pointer ${
                currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>
      <button
        className={`absolute top-1/2 -translate-y-5 left-2 rounded-full w-6 h-6 bg-gray-200 text-gray-600 opacity-0 ${
          currentIndex > 0 ? 'group-hover:opacity-100' : ''
        }`}
        onClick={goToPrevSlide}
      >
        &lt;
      </button>
      <button
        className={`absolute top-1/2 -translate-y-5 right-2 rounded-full w-6 h-6 bg-gray-200 text-gray-600 opacity-0 ${
          currentIndex < slides.length - 1 ? 'group-hover:opacity-100' : ''
        }`}
        onClick={goToNextSlide}
      >
        &gt;
      </button>
    </div>
  );

  function renderCurrentPage() {
    return slides[currentIndex];
  }
};

export default Carousel;
