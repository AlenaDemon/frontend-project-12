import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Modal, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import filter from 'leo-profanity'
import { toast } from 'react-toastify'

import { hideModal } from '../slices/uiSlice.js'
import { selectAllChannels } from '../slices/channelsSlice.js'
import { useRenameChannelMutation } from '../services/channelsApi.js'

const Rename = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [renameChannel, { isLoading }] = useRenameChannelMutation()
  const { processedChannel } = useSelector(state => state.ui)
  const { id: channelId, name: channelName } = processedChannel ?? {}
  const channelNames = useSelector(selectAllChannels).map(c => c.name)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  const schema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('validate.min3'))
      .max(20, t('validate.max20'))
      .required(t('validate.required'))
      .notOneOf(channelNames, t('validate.mustUnique')),
  })

  const formik = useFormik({
    initialValues: { name: channelName || '' },
    validationSchema: schema,
    onSubmit: async ({ name }, { resetForm }) => {
      try {
        await renameChannel({ id: channelId, name: filter.clean(name) }).unwrap()
        toast.success(t('rename.rename'))
        dispatch(hideModal())
        resetForm()
      }
      catch {
        toast.error(t('errors.networkError'))
      }
    },
  })

  if (!channelId) return null

  return (
    <Modal
      show
      centered
      onHide={() => dispatch(hideModal())}
      aria-labelledby="rename-channel-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('rename.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              className="mb-2"
              ref={inputRef}
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                (formik.touched.name && !!formik.errors.name) || !!formik.status
              }
              disabled={isLoading}
            />
            <Form.Label visuallyHidden>{t('add.name')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name || formik.status}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="me-2"
              onClick={() => dispatch(hideModal())}
              disabled={isLoading}
            >
              {t('rename.cancel')}
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {t('rename.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Rename
