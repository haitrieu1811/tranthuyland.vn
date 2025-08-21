import { NotebookText } from "lucide-react";

import ContactForm from "@/components/contact-form";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";

export default function ContactButton() {
  return (
    <Modal>
      <Button
        asChild
        variant="destructive"
        className="rounded-full hidden lg:flex"
      >
        <ModalTrigger>
          <NotebookText />
          Liên hệ tư vấn
        </ModalTrigger>
      </Button>
      <Button
        asChild
        variant="destructive"
        size="icon"
        className="rounded-full lg:hidden"
      >
        <ModalTrigger>
          <NotebookText />
        </ModalTrigger>
      </Button>
      <ModalBody className="max-h-[90vh] overflow-y-auto">
        <ModalContent>
          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
            Điền thông tin để được tư vấn
          </h4>
          <ContactForm />
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
