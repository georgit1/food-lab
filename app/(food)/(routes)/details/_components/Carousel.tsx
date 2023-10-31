'use client';

import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { useState } from 'react';

interface CarouselProps {
  imageUrl: string;
  preferences: string[];
}

const Carousel = ({ imageUrl, preferences }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    <div key='image' className='h-48'>
      <Image src={imageUrl} alt='Food Image' fill />
    </div>,
    <div key='details' className='h-48 p-2 pt-0'>
      <Separator className='mb-2' />
      <h2 className='text-lg text-primary-600 font-semibold'>Attributes</h2>
      {preferences.length !== 0 ? (
        <div>
          {preferences.map((pref) => (
            <span key={pref}>{pref}</span>
          ))}
        </div>
      ) : (
        <p className='text-sm text-center text-primary-600 mt-8'>
          no data available
        </p>
      )}
    </div>,
  ];

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentIndex(index);
    }
  };

  return (
    // TODO - npm install react-swipeable
    <div className='relative'>
      {renderCurrentPage()}
      <div className='absolute -top-3 right-0 flex space-x-1.5 mr-2'>
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
  );

  function renderCurrentPage() {
    return slides[currentIndex];
  }
};

export default Carousel;
