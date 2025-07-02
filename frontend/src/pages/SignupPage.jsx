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
import path from '../routes/routes.js'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth, removeAuth } from '../slices/authSlice.js'
import { useSignupMutation } from '../services/authApi.js'
import { useTranslation } from 'react-i18next'

const SignupPage = () => {
  const usernameRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [signup, { isLoading }] = useSignupMutation()
  const { t } = useTranslation()
  const auth = useSelector(state => state.auth)

  const validationSchema = yup.object({
    username: yup.string()
      .min(3, t('validate.min3'))
      .max(20, t('validate.max20'))
      .required(t('validate.required')),
    password: yup.string()
      .min(6, t('validate.min6'))
      .required(t('validate.required')),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], t('validate.mustMatch'))
      .required(t('validate.required')),
  })

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(path.chat)
    }
  }, [auth.isAuthenticated, navigate])

  useEffect(() => {
    usernameRef.current.focus()
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
        dispatch(removeAuth())

        const res = await signup(values).unwrap()

        if (!res.token) throw new Error('Токен не получен')

        dispatch(setAuth({
          username: res.username,
          token: res.token,
        }))

        navigate(path.chat, { replace: true })
      }
      catch (error) {
        dispatch(removeAuth())
        if (error.status === 409) {
          setErrors({ username: t('errors.mustUnique') })
        }
        else {
          setErrors({ username: t('errors.registrationError') })
        }
      }
      finally {
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
                <h1 className="text-center mb-4">{t('signup.title')}</h1>

                <FloatingLabel
                  controlId="username"
                  label={t('signup.username')}
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
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                  disabled={formik.isSubmitting || isLoading}
                >
                  {t('signup.send')}
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
