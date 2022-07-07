import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import NavBarItens from './NavBarItens';
import {
  AppShell,
  Header,
  Text,
  Navbar,
  Group,
  ActionIcon,
  ThemeIcon,
  MediaQuery,
  Burger,
  Button,
  Menu,
  useMantineColorScheme,
} from '@mantine/core';
import { Settings, TestPipe } from 'tabler-icons-react';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

interface IAppContainer {
  children: ReactNode;
}

const AppContainer: React.FC<IAppContainer> = ({ children }) => {
  const route = useRouter();
  const [opened, setOpened] = useState<boolean>(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="md">
          <Group position="apart">
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger opened={opened} onClick={() => setOpened((o) => !o)} color="cyan" />
            </MediaQuery>
            <Group direction="row">
              <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                <ThemeIcon color="green" size="lg" radius="lg">
                  <TestPipe />
                </ThemeIcon>
              </MediaQuery>
              <Text size="lg" weight="bolder">
                Mantine Testing
              </Text>
            </Group>
            <Menu
              control={
                <ActionIcon color="cyan" size="lg">
                  <Settings />
                </ActionIcon>
              }
            >
              <Menu.Item onClick={() => toggleColorScheme()}>
                <ColorSchemeToggle />
              </Menu.Item>
            </Menu>
          </Group>
        </Header>
      }
      navbar={
        <Navbar p="xs" width={{ base: 250 }} hiddenBreakpoint="sm" hidden={!opened}>
          {NavBarItens.map((item, index) => {
            return (
              <Link href={item.url} key={index}>
                <Button
                  style={route.asPath === item.url ? { borderBottom: '2px solid cyan' } : {}}
                  component="a"
                  color="dark"
                  mb="sm"
                  variant="subtle"
                  leftIcon={
                    <ThemeIcon variant="outline" radius="lg" size="md" color="cyan">
                      {item.icon}
                    </ThemeIcon>
                  }
                >
                  <Text size="lg">{item.label}</Text>
                </Button>
              </Link>
            );
          })}
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
};

export default AppContainer;
