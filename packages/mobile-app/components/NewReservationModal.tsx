import React from 'react';
import { AdaptiveBottomSheet } from './index';
import NewReservationContent from './NewReservationContent';

interface NewReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (reservationData: any) => void;
}

const NewReservationModal: React.FC<NewReservationModalProps> = ({ 
  isOpen, 
  onClose, 
  onComplete 
}) => {
  const handleComplete = (reservationData: any) => {
    onComplete?.(reservationData);
    onClose();
  };

  return (
    <AdaptiveBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="New Reservation"
      snapPoints={[0.85]}
      initialSnapPoint={0}
      enablePanGesture={true}
      showHandle={true}
      tabletLayout="centeredModal"
    >
      <NewReservationContent 
        onClose={onClose}
        onComplete={handleComplete}
        showBackButton={false}
      />
    </AdaptiveBottomSheet>
  );
};

export default NewReservationModal;
