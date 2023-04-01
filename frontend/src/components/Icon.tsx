import { withSx } from '@cads-ui/core';
import { Icon as Iconify, IconifyIcon } from '@iconify/react';
import clsx from 'clsx';

// -----------------------------
interface IconProps extends React.ComponentProps<typeof Iconify> {
  icon: string | IconifyIcon;
}

// -----------------------------
const Icon = withSx<IconProps>((props) => {
  const { icon, className, ...other } = props;

  return <Iconify className={clsx('icon', className)} icon={icon} {...other} />;
});

export default Icon;
