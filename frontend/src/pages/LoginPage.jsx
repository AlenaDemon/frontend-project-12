import React from 'react'
import { useEffect, useRef} from 'react'
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
import { useLocation, useNavigate, Link } from 'react-router-dom'
import pict2 from '../assets/pict2.jpg'
{/*import useAuth from '../hooks/index.jsx';*/}
import { path } from '../routes/routes.js'
import { useLoginMutation } from '../services/authApi.js'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
import { setAuth } from '../slices/authSlice.js'

const LoginPage = () => {
 {/* const auth = useAuth()*/}
  const inputRef = useRef()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const validationSchema = Yup.object({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  })

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    navigate(path.chat, { replace: true });
  }
}, [navigate])

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true)

      try {
        console.log(values)
        const res = await login(values).unwrap()
        console.log('Полный ответ сервера:', res); 
        if (!res.token) throw new Error('Токен не получен');
        dispatch(setAuth({ 
        username: values.username, 
        token: res.token 
        }))
       {/* auth.logIn()*/}
        navigate(path.chat, { replace: true })
      }
      catch (error) {
        console.log('res', error)
        const message = error.data?.message || 'Неверные имя пользователя или пароль'
        setErrors({ password: message })
        inputRef.current.focus()
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
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <img 
                  src={pict2} 
                  className="rounded-circle" 
                  alt="Войти" 
                />
              </Col>
              <Col xs={12} md={6} className="mt-3 mt-md-0">
                <Form onSubmit={formik.handleSubmit}>
                  <fieldset>
                    <h1 className="text-center mb-4">Войти</h1>
                    <FloatingLabel
                      controlId="username"
                      label="Ваш ник"
                      className="mb-3"
                    >
                      <FormControl
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        placeholder="username"
                        name="username"
                        autoComplete="username"
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.username && !!formik.errors.username}
                        required
                        ref={inputRef}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="password"
                      label="Пароль"
                      className="mb-4"
                    >
                      <FormControl
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder="password"
                        name="password"
                        autoComplete="current-password"
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.password && !!formik.errors.password}
                        required
                      />
                      <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <Button 
                      variant="outline-primary" 
                      type="submit" 
                      className="w-100 mb-3"
                      disabled={formik.isSubmitting || isLoading}
                    >
                      Войти
                    </Button>
                  </fieldset>
                </Form>
              </Col>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>{' '}
                <Link to={path.signup}>
                  Регистрация
                </Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
    
  )
}

export default LoginPage