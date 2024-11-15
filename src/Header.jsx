import React from 'react';

const Header = () => {
  return (
    <div
      className="w-full h-48 flex flex-col justify-center items-center text-center p-4 md:h-64 lg:h-52 bg-cover bg-center"
      style={{
        backgroundImage: "url('/books.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-50 p-4 rounded-lg flex flex-col items-center space-y-2">
        <p className="text-2xl md:text-4xl lg:text-4xl font-bold text-white">Books Collection</p>
        <p className="text-sm md:text-base lg:text-lg text-gray-200">Your personal list of books</p>
      </div>
    </div>
  );
};

export default Header;
