import Modal from 'react-modal';
const tags = ['Design', 'Development'];
export default function ModalWrapper({ modal, setModal, children }: any) {
  function getRandomColor() {
    let color = 'rgba(';
    for (let i = 0; i < 3; i++) {
      color += Math.floor(Math.random() * 256) + ',';
    }
    color += '0.1)';
    return color;
  }
  return (
    <Modal
      isOpen={modal}
      onRequestClose={() => setModal(false)}
      contentLabel="Example Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          width: '50%',
          height: 'auto',
          margin: 'auto',
          zIndex: 50,
          padding: 30,
        },
      }}
      className="bg-gray-50 w-1/2 h-1/2 z-50 m-auto text-gray-800 rounded-lg overflow-hidden shadow-lg   "
    >
      {children}
    </Modal>
  );
}
