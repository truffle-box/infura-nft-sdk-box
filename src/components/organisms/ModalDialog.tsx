import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

interface ModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  afterLeave?: () => void;
  children?: React.ReactNode;
  // transparent?: boolean;
  unmount?: boolean;
}

/**
 * DOCS: https://headlessui.dev/react/dialog#basic-example
 *
 * @param children - the elements inside the dialog. This will handle all the logic for opening/closing mostly.
 * @param isOpen - flag to show/hide
 * @param onDismiss - function you call back in the parent.
 * @param unmount - if we want to unmount this element after closing
 * @param afterLeave - func to call when we leave this dialog.
 * @returns {JSX.Element} - the modal element ready to rock.
 */
function ModalDialog ({
  children,
  isOpen,
  onDismiss,
  unmount,
  afterLeave
}: ModalProps) {

  return (<>
      <Transition show={isOpen} as={Fragment} afterLeave={afterLeave}>
        <Dialog
          onClose={onDismiss}
          unmount={unmount}
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
                {children}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}

export default ModalDialog
