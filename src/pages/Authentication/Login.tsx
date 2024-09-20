import { Button, TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { loginUserAction } from '../../redux/auth/auth.action'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { useNavigate } from 'react-router-dom'

interface FormValues {
  email: string
  password: string
}

const initialValues = {
  email: '',
  password: '',
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const Login = () => {
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, AnyAction>>()
  const handleSubmit = (values: FormValues) => {
    dispatch(loginUserAction(values))
    console.log('Login successful', values)
    navigate('/')
  }
  const navigate = useNavigate()

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className='space-y-5'>
              <Field
                as={TextField}
                name='email'
                placeholder='Email'
                type='email'
                variant='outlined'
                fullWidth
              />
              <ErrorMessage
                name='email'
                component={'div'}
                className='text-red-500'
              />
            </div>
            <div className='space-y-5'>
              <Field
                as={TextField}
                name='password'
                placeholder='Password'
                type='password'
                variant='outlined'
                fullWidth
              />
              <ErrorMessage
                name='password'
                component={'div'}
                className='text-red-500'
              />
            </div>
            <Button
              sx={{ padding: '0.8rem 0rem' }}
              fullWidth
              type='submit'
              variant='contained'
              color='primary'
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <div className='pt-5 flex justify-center items-center gap-2'>
        <p>Don't have an account?</p>
        <Button
          variant='text'
          color='primary'
          onClick={() => {
            navigate('/register')
          }}
        >
          Register
        </Button>
      </div>
    </div>
  )
}

export default Login
