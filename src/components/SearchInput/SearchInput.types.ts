/* eslint-disable no-unused-vars */
export interface SearchInputProps {
  onChange: (text: string) => void;
  value: string;
  disabled?: boolean;
  onReset?: () => void;
}
