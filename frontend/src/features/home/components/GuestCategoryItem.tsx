import { Avatar, Flex, Typography } from '@cads-ui/core';
import React from 'react';
import { withMinio } from '~/utils/withStatic';
interface Category {
  _id: string;
  name: string;
  photo: string;
}
const CategoryItemHP: React.FC<Category> = (props) => {
  return (
    <React.Fragment>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ p: 2, h: 1, shadow: 3, position: 'relative' }}
      >
        <Avatar
          shape="rounded"
          src={withMinio(props.photo)}
          sx={{ bgColor: '#fff', color: 'primary.main' }}
          size={100}
        />
        <Typography align="center" sx={{ mt: 3, mb: 2, wordBreak: 'break-all' }} maxLine={2}>
          {props.name}
        </Typography>
        <Flex
          sx={{
            position: 'absolute',
            right: 6,
            top: 12,
            '& .icon': { fs: 24, color: 'text.secondary', cursor: 'pointer', _hover: { color: 'text.primary' } }
          }}
          spacing={2}
        ></Flex>
      </Flex>
    </React.Fragment>
  );
};

export default CategoryItemHP;
