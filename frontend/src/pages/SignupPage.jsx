import React from 'react'
import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  FloatingLabel,
  FormControl,
} from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import pict3 from '../assets/pict3.jpg'
import { path } from '../routes/routes.js'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { setAuth } from '../slices/authSlice.js'
import { useSignupMutation } from '../services/authApi.js'

const SignupPage = () => {
  const usernameRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [signup, { isLoading }] = useSignupMutation()

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Обязательное поле'),
  });

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate(path.chat, { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    usernameRef.current.focus();
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true)

      try {
        const res = await signup(values).unwrap()
        console.log('Полный ответ сервера:', res)
        
        if (!res.token) throw new Error('Токен не получен')
        
        dispatch(setAuth({
          username: values.username,
          token: res.token,
        }))
        
        navigate(path.chat, { replace: true })
      } catch (error) {
        console.error('Ошибка регистрации:', error)
        const message = error.data?.message || 'Ошибка регистрации'
        setErrors({ username: message })
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img 
                  src={pict3} 
                  className="rounded-circle" 
                  alt="Регистрация" 
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                
                <FloatingLabel
                  controlId="username"
                  label="Имя пользователя"
                  className="mb-3"
                >
                  <FormControl
                    placeholder="От 3 до 20 символов"
                    name="username"
                    autoComplete="username"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    isInvalid={formik.touched.username && !!formik.errors.username}
                    ref={usernameRef}
                  />
                  <Form.Control.Feedback placement="right" className="invalid-tooltip">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
                
                <FloatingLabel
                  controlId="password"
                  label="Пароль"
                  className="mb-3"
                >
                  <FormControl
                    placeholder="Не менее 6 символов"
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required
                    autoComplete="new-password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={formik.touched.password && !!formik.errors.password}
                  />
                  <Form.Control.Feedback placement="right" className="invalid-tooltip">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
                
                <FloatingLabel
                  controlId="confirmPassword"
                  label="Подтвердите пароль"
                  className="mb-4"
                >
                  <FormControl
                    placeholder="Пароли должны совпадать"
                    name="confirmPassword"
                    required
                    autoComplete="new-password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                  />
                  <Form.Control.Feedback placement="right" className="invalid-tooltip">
                  </Form.Control.Feedback>
                </FloatingLabel>
                
                <Button 
                  variant="outline-primary" 
                  type="submit" 
                  className="w-100"
                  disabled={formik.isSubmitting || isLoading}
                >
                  {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignupPage