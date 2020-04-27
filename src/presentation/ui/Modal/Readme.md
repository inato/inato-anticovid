### Modal

```js
import { Modal, Button, ModalProvider } from '@inato/ui';
import { useState } from 'react';

const [isModalOpen, setIsModalOpen] = useState(false);
const [isSubmitting, setSubmitting] = useState(false);

<ModalProvider>
  <Button onClick={() => setIsModalOpen(true)}>Open modal</Button>
  {isModalOpen && (
    <Modal
      title="Modal Example Title"
      onRequestClose={() => setIsModalOpen(false)}
      primaryAction={{
        label: 'Confirm',
        onClick: () => {
          setSubmitting(true);
          setTimeout(() => {
            setSubmitting(false);
            setIsModalOpen(false);
          }, 300);
        },
        loading: isSubmitting,
      }}
      secondaryAction={{
        label: 'Cancel',
        onClick: () => setIsModalOpen(false),
      }}
      size="small"
    >
      Modal content
    </Modal>
  )}
</ModalProvider>;
```
