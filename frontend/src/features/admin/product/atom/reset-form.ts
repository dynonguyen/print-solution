import { atom } from 'recoil';

export const resetFormAtom = atom<boolean>({
  key: 'product-reset-form',
  default: false
});
