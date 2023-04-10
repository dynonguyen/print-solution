import { Button, Flex, Input, Select, useEffectNotFirst } from '@cads-ui/core';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Icon from '~/components/Icon';
import { PRODUCT_OPTION_TYPES, PRODUCT_OPTION_TYPES_OPTIONS } from '~/constants/common';
import { ProductOption } from '~/types/Product';
import { generateId } from '~/utils/helper';
import { resetFormAtom } from '../atom/reset-form';

// -----------------------------
interface ProductOptionFieldsProps {
  onChange: (options: ProductOption[]) => void;
  defaultValue?: ProductOption[];
}

// -----------------------------
const ProductOptionFields: React.FC<ProductOptionFieldsProps> = ({ onChange, defaultValue }) => {
  const [options, setOptions] = React.useState<Array<ProductOption & { id: string }>>(
    defaultValue ? defaultValue.map((val) => ({ id: generateId(), ...val })) : []
  );
  const resetFormFlag = useRecoilValue(resetFormAtom);

  useEffectNotFirst(() => {
    onChange(
      options
        .filter((option) => option.label && (option.optionType === PRODUCT_OPTION_TYPES.INPUT || option.values?.length))
        .map((option) => ({ label: option.label, optionType: option.optionType, values: option.values }))
    );
  }, [options]);

  useEffectNotFirst(() => {
    setOptions([]);
  }, [resetFormFlag]);

  return (
    <Flex direction="column" spacing={2}>
      {options.map((option) => (
        <Flex spacing={2} key={option.id}>
          <Select
            fullWidth
            defaultValue={option.optionType}
            value={option.optionType}
            options={PRODUCT_OPTION_TYPES_OPTIONS}
            placeholder="Loại tùy chọn"
            onChange={(newType) =>
              setOptions(options.map((o) => (o.id !== option.id ? o : { ...o, optionType: newType })))
            }
          />
          <Input
            placeholder="Tên tùy chọn"
            debounceTime={250}
            fullWidth
            defaultValue={option.label}
            onChange={(e) =>
              setOptions(options.map((o) => (o.id !== option.id ? o : { ...o, label: e.target.value.trim() })))
            }
          />
          {(option.optionType === PRODUCT_OPTION_TYPES.MULTIPLE_SELECT ||
            option.optionType === PRODUCT_OPTION_TYPES.SINGLE_SELECT) && (
            <Select
              fullWidth
              multiple
              OptionMenu={<></>}
              defaultValue={option.values}
              autocompleteMode
              renderEndIcon={() => null}
              placeholder="Nhập tùy chọn và nhấn Enter"
              onChange={(_, values) => setOptions(options.map((o) => (o.id !== option.id ? o : { ...o, values })))}
            />
          )}
          <Icon
            onClick={() => setOptions([...options.filter((o) => o.id !== option.id)])}
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
        onClick={() =>
          setOptions([
            ...options,
            { id: generateId(), label: '', optionType: PRODUCT_OPTION_TYPES.SINGLE_SELECT, values: [] }
          ])
        }
      >
        Thêm tùy chọn khác
      </Button>
    </Flex>
  );
};

export default ProductOptionFields;
