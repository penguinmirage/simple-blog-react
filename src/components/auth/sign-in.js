import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../realworldblog-api/auth-contect';
import './sign-in.css';

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="sign-in">
      <h2 className="sign-in__title">Sign In</h2>
      <form className="sign-in__form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="sign-in__form-container__email">
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
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        <div className="sign-in__form-container__password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Password must not exceed 40 characters',
              },
            })}
            style={{
              borderColor: errors.password ? 'red' : '',
            }}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        {errors.general && <p style={{ color: 'red' }}>{errors.general.message}</p>}

        <div
          className="log-in-btn"
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
          <p className="log-in-btn__name">Login</p>
        </div>

        <p className="sign-in__footer">
          Don’t have an account? <a href="/signup">Sign Up.</a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
