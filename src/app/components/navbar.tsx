import { useState } from 'react';
import ModalTask from './form/modal-task';

export default function NavBar() {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };
  return (
    <nav className="  ">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-end md:items-center pb-2 cursor-pointer">
          <div className="flex items-end justify-end">
            <div className="flex  md:flex justify-end items-end w-full">
              <a
                className="px-4 py-2 mt-2 text-sm font-semibold text-green-secondary transition-colors duration-200 transform rounded   bg-green-primary   hover:bg-green-secondary hover:text-white "
                onClick={() => handleModal()}
              >
                + Nova task
              </a>
            </div>
          </div>
        </div>
      </div>
      <ModalTask modal={modal} setModal={setModal} />
    </nav>
  );
}
