const RightSide = () => {
  return (
    <div className='bg-primary-100 p-4 pt-[6.5rem] relative'>
      <h1 className='text-black'>Right Side Content</h1>
      <p className='text-black'>More content here...</p>

      {/* Overlay content (centered in the right side) */}
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <p className='text-black'>Overlay Content</p>
      </div>
    </div>
  );
};

export default RightSide;
