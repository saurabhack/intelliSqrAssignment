import { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center ">
      <div className="w-full max-w-md p-6 bg-white  rounded-lg ">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Welcome Back!</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="UID"
              className="px-2 py-2 border rounded-lg border-gray-300   focus:outline-none"
            />
          </div>

         

          <div className="flex flex-col">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
              className="px-4 py-2 border rounded-lg border-gray-300  focus:outline-none"
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-4 text-white bg-[#2B3A67] rounded-lg    focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
