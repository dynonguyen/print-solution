import { Avatar, Flex, List, Popover, Typography } from '@cads-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '~/components/Icon';
import { PATH } from '~/constants/path';
import useAuth from '~/hooks/useAuth';
import { withPublic } from '~/utils/withStatic';

// -----------------------------
interface HeaderAccountProps {
  role?: string;
}

// -----------------------------
const HeaderAccount: React.FC<HeaderAccountProps> = (props) => {
  const { role } = props;
  const [openMenu, setOpenMenu] = React.useState(false);
  const anchorEl = React.useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { profile = {}, logout } = useAuth();

  const avt = withPublic('img/default-user.png');
  const name = `${profile.firstName} ${profile.lastName}`;

  return (
    <React.Fragment>
      <Flex spacing={1.5} sx={{ cursor: 'pointer' }} onClick={() => setOpenMenu(!openMenu)}>
        <Avatar ref={anchorEl} src={avt} alt={name} />
        <Flex
          sx={(theme) => ({ [theme.breakpoints.down('md')]: { __display: 'none' } })}
          spacing={1}
          direction="column"
        >
          <Typography fs={16} fw={500}>
            {name}
          </Typography>
          {role && (
            <Typography fs={15} color="text.secondary">
              {role}
            </Typography>
          )}
        </Flex>
      </Flex>

      {/* Account menu */}
      <Popover
        anchorEl={anchorEl}
        open={openMenu}
        offset={[0, 10]}
        placement="bottom-end"
        sx={{ minW: 180 }}
        showBackdrop
        onClose={() => setOpenMenu(false)}
      >
        <List
          sx={{ py: 2, minW: 220 }}
          items={[
            {
              primary: 'Quản lý tài khoản',
              icon: <Icon icon="ant-design:setting-filled" />,
              onItemClick: () => navigate(PATH.ACCOUNT.PROFILE)
            },
            {
              primary: 'Đăng xuất',
              icon: <Icon icon="ri:logout-box-r-fill" />,
              onItemClick: () => logout()
            }
          ]}
        />
      </Popover>
    </React.Fragment>
  );
};

export default HeaderAccount;
