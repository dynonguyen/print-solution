import { Button, Flex, Input, useEffectNotFirst } from '@cads-ui/core';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Icon from '~/components/Icon';
import { ProductInfo } from '~/types/Product';
import { generateId } from '~/utils/helper';
import { resetFormAtom } from '../atom/reset-form';

// -----------------------------
interface ProductInfoFieldsProps {
  onChange: (infos: ProductInfo[]) => void;
  defaultValue?: ProductInfo[];
}

// -----------------------------
const ProductInfoFields: React.FC<ProductInfoFieldsProps> = ({ onChange, defaultValue }) => {
  const [infos, setInfos] = React.useState<Array<ProductInfo & { id: string }>>(
    defaultValue ? defaultValue.map((val) => ({ id: generateId(), ...val })) : []
  );
  const resetFormFlag = useRecoilValue(resetFormAtom);

  useEffectNotFirst(() => {
    onChange(
      infos.filter((info) => info.label && info.value).map((info) => ({ label: info.label, value: info.value }))
    );
  }, [infos]);

  useEffectNotFirst(() => {
    setInfos([]);
  }, [resetFormFlag]);

  const handleInputChange = (id: string, field: 'label' | 'value', value: string) => {
    setInfos(infos.map((info) => (info.id === id ? { ...info, [field]: value } : info)));
  };

  return (
    <Flex direction="column" spacing={2}>
      {infos.map((info) => (
        <Flex spacing={2} key={info.id}>
          <Input
            placeholder="Tên thông số. VD: Màu sắc"
            fullWidth
            defaultValue={info.label}
            debounceTime={250}
            onChange={(e) => handleInputChange(info.id, 'label', e.target.value.trim())}
          />
          <Input
            placeholder="Giá trị thông số. VD: Nhiều màu"
            fullWidth
            debounceTime={250}
            defaultValue={info.value}
            onChange={(e) => handleInputChange(info.id, 'value', e.target.value.trim())}
          />
          <Icon
            onClick={() => setInfos([...infos.filter((i) => i.id !== info.id)])}
            icon="mdi:bin"
            sx={{ flexShrink: 0, cursor: 'pointer', fs: 24, color: 'text.secondary', _hover: { color: 'error.main' } }}
          />
        </Flex>
      ))}
      <Button
        color="secondary"
        variant="text"
        sx={{
          __bgColor: 'unset',
          justifyContent: 'flex-start',
          px: 0,
          _hover: { color: 'secondary.dark' },
          w: 'fit-content'
        }}
        startIcon={<Icon icon="material-symbols:add" />}
        onClick={() => setInfos([...infos, { id: generateId(), label: '', value: '' }])}
      >
        Thêm thông số khác
      </Button>
    </Flex>
  );
};

export default ProductInfoFields;
