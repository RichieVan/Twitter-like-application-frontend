export interface ConfirmPopupProps {
  closeModal?: () => void;
  text: string | string[];
  confirmText: string;
  declineText: string;
  confirmAction: () => Promise<void>;
  confirmButtonMods: string[];
}
