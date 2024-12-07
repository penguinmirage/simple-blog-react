import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../realworldblog-api/auth-contect';
import './sign-up.css';

const CreateAccount = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const { username, email, password } = data;

    try {
      const response = await fetch('https://blog-platform.kata.academy/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { username, email, password },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors || 'Sign-up failed');
      }

      const result = await response.json();
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-account">
      <h2 className="create-account__title">Create new account</h2>
      <form className="create-account__form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="create-account__form-container__username">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must be at least 3 characters' },
              maxLength: { value: 20, message: 'Username must not exceed 20 characters' },
            })}
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
        </div>

        <div className="create-account__form-container__email">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: 'Invalid email format',
              },
            })}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        <div className="create-account__form-container__password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
              maxLength: { value: 40, message: 'Password must not exceed 40 characters' },
            })}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        <div className="create-account__form-container__repeat-password">
          <label htmlFor="confirmPassword">Repeat Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Repeat Password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === watch('password') || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
        </div>

        <div
          className="create-account-btn"
          role="button"
          tabIndex="0"
          onClick={handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleSubmit(onSubmit)();
              e.preventDefault();
            }
          }}
        >
          <p className="create-account-btn__name">Create</p>
        </div>

        <p className="create-account__footer">
          Already have an account? <a href="/signin">Sign In.</a>
        </p>
      </form>
    </div>
  );
};

export default CreateAccount;
