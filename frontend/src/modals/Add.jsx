import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import filter from 'leo-profanity'
import { toast } from 'react-toastify'
import { Modal, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { hideModal, selectChannel } from '../slices/uiSlice.js'
import { useAddChannelMutation } from '../services/channelsApi.js'
import { selectAllChannels } from '../slices/channelsSlice.js'

const Add = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [addChannel, { isLoading }] = useAddChannelMutation()
  const allChannels = useSelector(selectAllChannels)
  const channelNames = allChannels.map(channel => channel.name)

  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('validate.min3'))
      .max(20, t('validate.max20'))
      .notOneOf(channelNames, t('validate.mustUnique')),
  })

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const cleanName = filter.clean(values.name)
        const { id } = await addChannel({ name: cleanName }).unwrap()
        toast.success(t('add.created'))
        dispatch(selectChannel(id))
        resetForm()
        dispatch(hideModal())
      }
      catch {
        toast.error(t('errors.networkError'))
      }
    },
  })

  return (
    <Modal
      show
      onHide={() => dispatch(hideModal())}
      centered
      aria-labelledby="add-channel-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('add.add')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              ref={inputRef}
              name="name"
              disabled={isLoading}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={(formik.touched.name && !!formik.errors.name)}
            />
            <Form.Label visuallyHidden>{t('add.name')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="me-2"
              onClick={() => dispatch(hideModal())}
              disabled={isLoading}
            >
              {t('add.cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading || !formik.isValid}
            >
              {t('add.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Add
