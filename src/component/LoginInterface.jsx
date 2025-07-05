import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { MdEmail, MdLock } from 'react-icons/md';
import { useState } from 'react';
import { toast } from 'react-toastify';

function LoginInterface({ onClose }) {
const { darkTheme } = useSelector(state => state.conditions);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill all fields!');
      return;
    }
    toast.success('Logged in successfully!');
    onClose();
  };

  return (
    <div id='login' className={`relative p-6 w-[90%] sm:w-[400px] rounded-xl shadow-lg ${darkTheme ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <button onClick={onClose} className="absolute top-3 right-3 text-xl cursor-pointer hover:text-[#29e3ad]">
        <IoClose />
      </button>

      <h2 className="text-2xl font-semibold mb-6 text-center">Welcome Back</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <MdEmail className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={`w-full pl-10 py-2 rounded-md border outline-none ${darkTheme ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-black'}`}
          />
        </div>

        <div className="relative">
          <MdLock className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`w-full pl-10 py-2 rounded-md border outline-none ${darkTheme ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-black'}`}
          />
        </div>

        <button type="submit" className={`cursor-pointer py-2 rounded-md ${darkTheme?"bg-white text-black":'bg-black text-white'} hover:bg-black/80`}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginInterface;
