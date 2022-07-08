import { Center, Loader } from '@mantine/core';

const Loading: React.FC = () => {
  return (
    <Center>
      <Loader mt={100} size="xl" variant="bars" color="cyan" />
    </Center>
  );
};

export default Loading;
