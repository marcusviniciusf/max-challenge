import { Flex } from "./common";
import { H2 } from "./typography";

type LoadingProps = {
  show: boolean;
};

export const Loading = (props: LoadingProps) => {
  const { show } = props;
  if (!show) {
    return null;
  }
  return (
    <Flex my={3} justifyContent="center" alignItems="center">
      <H2 fontWeight="bold">Loading...</H2>
    </Flex>
  );
};
