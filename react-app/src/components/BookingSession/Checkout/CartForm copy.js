import { useForm, Controller } from 'react-hook-form';
import { createBooking } from '../../../utils/useBookingApi';
import './CartForm.css';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const requiredFieldMessage = 'שדה חובה';
const schema = yup.object().shape({
  firstName: yup.string().required(requiredFieldMessage),
  lastName: yup.string().required(requiredFieldMessage),
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'האמייל לא תקין')
    .email('האמייל לא תקין')
    .required(requiredFieldMessage),
  phoneNumber: yup
    .string()
    .matches(/^0\d{9}$/, 'חייב להתחיל עם 0 ולהכיל 10 ספרות')
    .required(requiredFieldMessage),
});

function CartForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    createBooking(data);
  };

  const mustStar = <span style={{ color: 'red' }}>*</span>;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <label htmlFor="firstName">
          {mustStar}
          {'שם פרטי'}
        </label>
        <div className="input-wrapper">
          <Controller
            control={control}
            name="firstName"
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                placeholder="שם פרטי"
                className={errors.firstName ? 'invalid' : 'valid'}
              />
            )}
          ></Controller>
          {errors.firstName && (
            <p className="error">{errors.firstName.message}</p>
          )}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="lastName">
          {mustStar}
          {'שם משפחה'}
        </label>
        <div className="input-wrapper">
          <Controller
            control={control}
            name="lastName"
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                placeholder="שם משפחה"
                className={errors.lastName ? 'invalid' : 'valid'}
              />
            )}
          />
          {errors.lastName && (
            <p className="error">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="email">
          {mustStar}
          {'דואר אלקטרוני'}
        </label>
        <div className="input-wrapper">
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                placeholder='דוא"ל'
                className={errors.email ? 'invalid' : 'valid'}
              />
            )}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="phoneNumber">
          {mustStar}
          {'סלולרי'}
        </label>
        <div className="input-wrapper">
          <Controller
            control={control}
            name="phoneNumber"
            defaultValue=""
            render={({ field }) => (
              <input
                style={{ direction: 'ltr' }}
                {...field}
                placeholder="0512345678"
                className={errors.phoneNumber ? 'invalid' : 'valid'}
              />
            )}
          />
          {errors.phoneNumber && (
            <p className="error">{errors.phoneNumber.message}</p>
          )}
        </div>
      </div>

      <button className="custom-button" type="submit">
        המשך לדף תשלום
      </button>
    </form>
  );
}

export default CartForm;
