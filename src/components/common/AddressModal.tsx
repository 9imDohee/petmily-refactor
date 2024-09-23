import { Modal, Sheet } from '@mui/joy';
import DaumPostcode from 'react-daum-postcode';

interface AddressModalProps {
  open: boolean;
  onClose: () => void;
  handleAddressComplete: (zonecode: string, sido: string, sigungu: string, remainaddress: string) => void;
}

const AddressModal = ({ open, onClose, handleAddressComplete }: AddressModalProps) => {
  const handleComplete = (data: any) => {
    const [, , ...remainAddress] = data.address.split(' ');
    handleAddressComplete(data.zonecode, data.sido, data.sigungu, remainAddress.join(' '));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Sheet sx={{ width: '360px;' }}>
        <DaumPostcode onComplete={handleComplete} />
      </Sheet>
    </Modal>
  );
};

export default AddressModal;
