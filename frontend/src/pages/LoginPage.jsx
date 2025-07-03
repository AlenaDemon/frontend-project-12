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
import pict2 from '../assets/pict2.jpg'
import path from '../routes/routes.js'
import { useLoginMutation } from '../services/authApi.js'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth, removeAuth } from '../slices/authSlice.js'
import { useTranslation } from 'react-i18next'

const LoginPage = () => {
  const usernameRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const { t } = useTranslation()
  const auth = useSelector(state => state.auth)

  const validationSchema = yup.object({
    username: yup.string().required(t('validate.required')),
    password: yup.string().required(t('validate.required')),
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
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true)

      try {
        const res = await login(values).unwrap()
        if (!res.token) throw new Error('Токен не получен')
        dispatch(setAuth({
          username: values.username,
          token: res.token,
        }))
        navigate(path.chat, { replace: true })
      }
      catch (error) {
        dispatch(removeAuth())
        const message = error.data?.message || t('login.feedback')
        setErrors({ password: message })
        usernameRef.current.focus()
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
                    <h1 className="text-center mb-4">{t('login.entry')}</h1>
                    <FloatingLabel
                      controlId="username"
                      label={t('login.username')}
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
                        ref={usernameRef}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="password"
                      label={t('login.password')}
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
                      <Form.Control.Feedback type="invalid">
                        {t('login.feedback')}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <Button
                      variant="outline-primary"
                      type="submit"
                      className="w-100 mb-3"
                      disabled={formik.isSubmitting || isLoading}
                    >
                      {t('login.entry')}
                    </Button>
                  </fieldset>
                </Form>
              </Col>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('login.noAccount')}</span>
                <Link to={path.signup}>
                  {t('login.registration')}
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
