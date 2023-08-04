import React from "react";

const SignUpForm = ({ handleChange, handleSubmit }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="w-full mb-2"
        />
        <label>Profile Name</label>
        <input
          type="text"
          name="profileName"
          onChange={handleChange}
          className="w-full mb-2"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value=""
          onChange={handleChange}
          className="w-full mb-2"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
