// Step1.js
import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step1 = ({ nextStep }) => {
  const { register, handleSubmit, formState: { errors } } = useFormContext();

  const onSubmit = (data) => {
    console.log(data);
    nextStep();
  };

  return (
    <div>
      <h2>Step 3: Email</h2>
      <label>Email:</label>
      <input {...register('email', { required: 'Email is required' })} />
      {errors.email && <p>{errors.email.message}</p>}
      <button type="button" onClick={handleSubmit(onSubmit)}>Next</button>
    </div>
  );
};

export default Step1;
