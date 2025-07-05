import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { RxCrossCircled } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

function Form({ darkTheme }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().length === 0) return;
    navigate(`/search?query=${input.trim()}`);
    setInput('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='relative w-[140px] xs:w-[160px] sm:w-[200px] md:w-2/5 rounded-md'
    >
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        type="text"
        placeholder='Search movies/Tv Shows'
        className={`w-full px-8 rounded-md py-1.5 outline-none text-sm transition-all duration-300
          ${darkTheme ? 'bg-gray-900 text-white placeholder-gray-400 border-gray-600' : 'bg-white text-black placeholder-gray-500 border-gray-400'}
        `}
      />

      {input && (
        <button type="button" onClick={() => setInput('')} className='group absolute top-2.5 right-2.5'>
          <RxCrossCircled
            className={`group-hover:cursor-pointer ${darkTheme ? 'text-white' : 'text-black'}`}
            size={16}
          />
        </button>
      )}

      <button type="submit" className='group absolute top-2.5 left-2.5'>
        <BiSearch
          className={`group-hover:cursor-pointer ${darkTheme ? 'text-white' : 'text-black'}`}
          size={16}
        />
      </button>
    </form>
  );
}

export default Form;
