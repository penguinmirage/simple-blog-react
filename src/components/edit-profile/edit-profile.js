import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../realworldblog-api/auth-contect';
import './edit-profile.css';

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue('username', user.username);
      setValue('email', user.email);
      setValue('bio', user.bio || '');
      setValue('avatar', user.image || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://blog-platform.kata.academy/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          user: {
            username: data.username,
            email: data.email,
            bio: data.bio,
            image: data.avatar,
            password: data.password || undefined,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors || 'Update failed');
      }

      alert('Profile updated successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="edit-profile">
      <h2 className="edit-profile__title">Edit Profile</h2>
      <form className="edit-profile__form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="edit-profile__form-container__username">
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
            style={{
              borderColor: errors.username ? 'red' : '',
            }}
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
        </div>

        <div className="edit-profile__form-container__email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
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

        <div className="edit-profile__form-container__password">
          <label htmlFor="password">New Password (optional)</label>
          <input
            type="password"
            id="password"
            placeholder="New Password"
            {...register('password', {
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
              maxLength: { value: 40, message: 'Password must not exceed 40 characters' },
            })}
            style={{
              borderColor: errors.password ? 'red' : '',
            }}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        <div className="edit-profile__form-container__avatar">
          <label htmlFor="avatar">Avatar Image (URL)</label>
          <input
            type="text"
            id="avatar"
            placeholder="Avatar image URL"
            {...register('avatar', {
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i,
                message: 'Invalid image URL',
              },
            })}
            style={{
              borderColor: errors.avatar ? 'red' : '',
            }}
          />
          {errors.avatar && <p style={{ color: 'red' }}>{errors.avatar.message}</p>}
        </div>

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
          Save
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
