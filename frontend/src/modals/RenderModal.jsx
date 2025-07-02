import { useSelector } from 'react-redux'
import getModal from './getModal.js'

const RenderModal = () => {
  const { typeModal } = useSelector(state => state.ui)

  if (!typeModal) return null

  const ModalComponent = getModal(typeModal)

  if (!ModalComponent) return null

  return <ModalComponent />
}

export default RenderModal
