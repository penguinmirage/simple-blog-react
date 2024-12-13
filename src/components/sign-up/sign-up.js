import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../realworldblog-api/auth-contect';
import { Spin, message } from 'antd';
import './sign-up.css';

const CreateAccount = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setErrors,
    clearErrors,
  } = useForm();
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const validateUsername = async (username) => {
    setIsCheckingUsername(true);
    try {
      const response = await fetch(`https://blog-platform.kata.academy/api/profiles/${username}`);
      setIsCheckingUsername(false);

      if (response.ok) {
        return 'Username already exists';
      } else if (response.status === 404) {
        message.success('Nice username! And sure a unique one!');
        return true;
      } else {
        throw new Error('Unexpected server response');
      }
    } catch (err) {
      setIsCheckingUsername(false);
      return 'Unable to check';
    }
  };

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
              validate: async (value) => await validateUsername(value),
            })}
            onChange={() => clearErrors('username')}
            style={{
              borderColor: errors.username ? 'red' : '',
            }}
          />
          {isCheckingUsername && <Spin tip="Checking if the entered nickname us available" size="Large" />}
          {errors.username && <p style={{ color: 'red', borderColor: 'red' }}>{errors.username.message}</p>}
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
            style={{
              borderColor: errors.email ? 'red' : '',
            }}
          />
          {errors.email && <p style={{ color: 'red', borderColor: 'red' }}>{errors.email.message}</p>}
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
            style={{
              borderColor: errors.password ? 'red' : '',
            }}
          />
          {errors.password && <p style={{ color: 'red', borderColor: 'red' }}>{errors.password.message}</p>}
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
            style={{
              borderColor: errors.confirmPassword ? 'red' : '',
            }}
          />
          {errors.confirmPassword && (
            <p style={{ color: 'red', borderColor: 'red' }}>{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="checkbox">
          <input
            type="checkbox"
            id="agree"
            {...register('agree', { required: 'You must agree to proceed' })}
            style={{
              borderColor: errors.agree ? 'red' : '',
            }}
          />
          <label htmlFor="agree" className="checkbox-label">
            I agree to the processing of my personal information
          </label>
          {errors.agree && <p style={{ color: 'red', borderColor: 'red' }}>{errors.agree.message}</p>}
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
