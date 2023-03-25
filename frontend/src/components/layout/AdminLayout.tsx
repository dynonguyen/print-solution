import { alpha, AppBar, Avatar, Box, Flex, List, Popover, Sidebar, SidebarItems, Typography } from '@cads-ui/core';
import Notification from '@cads-ui/x/Notification';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/path';
import { withPublic } from '~/utils/withStatic';
import Icon from '../Icon';

// -----------------------------
const sidebarItems: SidebarItems[] = [
  {
    menu: [
      { label: 'Quản lý sản phẩm', link: PATH.ADMIN.PRODUCT, icon: <Icon icon="carbon:carbon-for-ibm-product" /> },
      { label: 'Quản lý đơn hàng', link: PATH.ADMIN.ORDER, icon: <Icon icon="icon-park-solid:transaction-order" /> },
      { label: 'Doanh thu', link: PATH.ADMIN.REVENUE, icon: <Icon icon="ph:currency-circle-dollar-fill" /> },
      { label: 'Tài khoản', link: PATH.ADMIN.PROFILE, icon: <Icon icon="ic:baseline-account-circle" /> },
      { label: 'Cài đặt', link: PATH.ADMIN.SETTINGS, icon: <Icon icon="ant-design:setting-filled" /> },
      { label: 'Đăng xuất', icon: <Icon icon="ri:logout-box-r-fill" /> }
    ]
  }
];
const SIDEBAR_WIDTH = 280;
const SIDEBAR_SMALL_WIDTH = 74;
const TOP_BAR_HEIGHT = 77;

// -----------------------------
const Account = () => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const anchorEl = React.useRef<HTMLElement>(null);
  const navigate = useNavigate();

  // TEST: fake data
  const avt = withPublic('img/default-user.png');
  const name = 'Nguyen Van A';
  const role = 'Admin';

  // TODO: Implement logic
  const handleLogout = () => {
    alert('Handle logout');
  };

  return (
    <React.Fragment>
      <Flex spacing={2} sx={{ cursor: 'pointer' }} onClick={() => setOpenMenu(!openMenu)}>
        <Avatar ref={anchorEl} src={avt} alt={name} />
        <Flex sx={(theme) => ({ [theme.breakpoints.down('md')]: { display: 'none' } })} spacing={1} direction="column">
          <Typography fs={16} fw={500}>
            {name}
          </Typography>
          <Typography fs={15} color="text.secondary">
            {role}
          </Typography>
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
          items={[
            {
              primary: 'Cài đặt',
              icon: <Icon icon="ant-design:setting-filled" />,
              onItemClick: () => navigate(PATH.ADMIN.PROFILE)
            },
            {
              primary: 'Đăng xuất',
              icon: <Icon icon="ri:logout-box-r-fill" />,
              onItemClick: handleLogout,
              itemProps: { sx: { color: 'error.main' } }
            }
          ]}
        />
      </Popover>
    </React.Fragment>
  );
};

const TopBar = () => {
  return (
    <AppBar
      sx={(theme) => ({
        height: TOP_BAR_HEIGHT,
        borderBottom: `solid 1px ${theme.palette.grey[300]}`,
        bgColor: '#fff'
      })}
      elevateOnScroll={false}
    >
      <Flex spacing={4} justifyContent="flex-end" sx={{ h: 1, p: 2 }}>
        {/* TODO: Implement logic */}
        <Notification PopoverProps={{ showBackdrop: true }} />
        <Account />
      </Flex>
    </AppBar>
  );
};

// -----------------------------
const AdminLayout = () => {
  const [isSmall, setIsSmall] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Flex alignItems="flex-start">
      <Sidebar
        sx={(theme) => ({
          '& .cads-sidebar': { bgColor: alpha(theme.palette.primary.mainRgb!, 0.06) },
          '& .cads-sidebar-home__icon': { w: 'auto' },
          '& .cads-sidebar-top': { borderBottom: `solid 1px ${theme.palette.grey[300]}`, pb: 4 },
          '& .cads-sidebar-body': { mt: 4 }
        })}
        items={sidebarItems}
        homeLogo={withPublic('img/logo.png')}
        homeTitle="Administrator"
        homeLink={PATH.ADMIN.ROOT}
        isSmall={isSmall}
        showHomeDivider={false}
        hoverToggle={false}
        showToggleIcon
        autoScale
        onToggleIconClick={() => setIsSmall(!isSmall)}
        onNavigate={navigate}
      />
      <Box
        sx={{ flexGrow: 1, ml: isSmall ? `${SIDEBAR_SMALL_WIDTH}px` : `${SIDEBAR_WIDTH}px`, transition: 'margin 0.3s' }}
      >
        <TopBar />
        <Box sx={{ p: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminLayout;
