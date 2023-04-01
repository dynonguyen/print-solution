import { alpha, AppBar, Box, Flex, Sidebar, SidebarItems, useEffectNotFirst } from '@cads-ui/core';
import Notification from '@cads-ui/x/Notification';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import HeaderAccount from '~/components/HeaderAccount';
import Icon from '~/components/Icon';
import { LS_KEY } from '~/constants/key';
import { PATH } from '~/constants/path';
import keycloak from '~/libs/keycloak';
import { withStatic } from '~/utils/withStatic';

// -----------------------------
const sidebarItems: SidebarItems[] = [
  {
    menu: [
      { label: 'Quản lý danh mục', link: PATH.ADMIN.CATEGORY, icon: <Icon icon="ic:round-category" /> },
      { label: 'Quản lý sản phẩm', link: PATH.ADMIN.PRODUCT.ROOT, icon: <Icon icon="carbon:carbon-for-ibm-product" /> },
      { label: 'Quản lý đơn hàng', link: PATH.ADMIN.ORDER, icon: <Icon icon="icon-park-solid:transaction-order" /> },
      { label: 'Doanh thu', link: PATH.ADMIN.REVENUE, icon: <Icon icon="ph:currency-circle-dollar-fill" /> },
      { label: 'Tài khoản', link: PATH.ADMIN.PROFILE, icon: <Icon icon="ic:baseline-account-circle" /> },
      { label: 'Cài đặt', link: PATH.ADMIN.SETTINGS, icon: <Icon icon="ant-design:setting-filled" /> },
      { label: 'Đăng xuất', icon: <Icon icon="ri:logout-box-r-fill" />, itemProps: { id: 'logout' } }
    ]
  }
];
const SIDEBAR_WIDTH = 280;
const SIDEBAR_SMALL_WIDTH = 74;
const TOP_BAR_HEIGHT = 77;

// -----------------------------
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
        <HeaderAccount role="Admin" />
      </Flex>
    </AppBar>
  );
};

// -----------------------------
const AdminLayout = () => {
  const [isSmall, setIsSmall] = React.useState(localStorage.getItem(LS_KEY.SIDEBAR_SMALL_MODE) == 'true');
  const navigate = useNavigate();

  useEffectNotFirst(() => localStorage.setItem(LS_KEY.SIDEBAR_SMALL_MODE, isSmall.toString()), [isSmall]);

  return (
    <Flex alignItems="flex-start">
      <Sidebar
        sx={(theme) => ({
          '& .cads-sidebar': { bgColor: alpha(theme.palette.primary.mainRgb!, 0.06) },
          '& .cads-sidebar-home__icon': { w: 'auto' },
          '& .cads-sidebar-top': { borderBottom: `solid 1px ${theme.palette.grey[300]}`, pb: 4 },
          '& .cads-sidebar-body': { mt: 4 }
        })}
        howActiveLink={(link) => window.location.pathname.includes(link)}
        items={sidebarItems}
        homeLogo={withStatic('img/logo.png')}
        homeTitle="Administrator"
        homeLink={PATH.ADMIN.ROOT}
        isSmall={isSmall}
        showHomeDivider={false}
        hoverToggle={false}
        showToggleIcon
        autoScale
        onAutoScale={() => setIsSmall(true)}
        onToggleIconClick={() => setIsSmall(!isSmall)}
        onNavigate={navigate}
        onItemClick={(item) => {
          if (item.itemProps?.id === 'logout') keycloak?.logout?.();
        }}
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

export default React.memo(AdminLayout, () => true);
