import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

function ModalDialog({ children, isOpen, setIsOpen }) {

  return (<>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {/* Full-screen scrollable container */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
              {/* Container to center the panel */}
              <div className="flex min-h-full items-center justify-center w-full">
                {/*CHILDREN HERE...*/}
                {children}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

export default ModalDialog;
