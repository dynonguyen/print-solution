type Props = {
  children: React.ReactNode;
};

function Item(props: Props) {
  const { children } = props;

  return <div>{children}</div>;
}

export default Item;
