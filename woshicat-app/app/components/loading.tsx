'use client';

const LoadingScreen: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return (
    <div className={ isLoading ? "loading-screen" : "hidden" }>
      <div className='text-4xl border-test rounded-full h-[350px] w-[350px] flex justify-center items-center'><div>Loading...</div></div>
    </div>
  );
};

export default LoadingScreen;
