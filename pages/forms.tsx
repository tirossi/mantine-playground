import { TextInput, Checkbox, Container, Title, Button, SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery, useSetState } from '@mantine/hooks';

import Loading from '../components/Loading/Loading';

interface FormValues {
  name: string;
  email: string;
  document: string;
  phone: string;
  termsOfService: boolean;
}

export default function Forms() {
  const breakCols = useMediaQuery('(min-width: 750px)');
  const [state, setState] = useSetState({ isLoading: false });

  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      email: '',
      document: '',
      phone: '',
      termsOfService: false,
    },
    validate: {
      name: (v) => (v.length > 2 ? null : 'Nome precisa ter mais de 2 letras'),
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Invalid email'),
      termsOfService: (v) => (v === true ? null : 'ai nao po'),
    },
  });

  const onSubmit = () => {
    setState({ isLoading: true });
    setTimeout(() => {
      console.log(form.values);
      setState({ isLoading: false });
    }, 3000);
  };

  return (
    <>
      <Container>
        {state.isLoading && <Loading />}
        {!state.isLoading && (
          <>
            <Title order={1}>Forms</Title>
            <form onSubmit={onSubmit}>
              <SimpleGrid cols={breakCols ? 2 : 1}>
                <TextInput
                  required
                  label="Nome"
                  placeholder="seu nome aqui"
                  {...form.getInputProps('name')}
                />
                <TextInput
                  required
                  label="Email"
                  placeholder="email@email.com"
                  {...form.getInputProps('email')}
                />
                <TextInput
                  required
                  label="CPF"
                  placeholder="xxx.xxx.xxx.xx"
                  {...form.getInputProps('document')}
                />
                <TextInput
                  required
                  label="Celular"
                  placeholder="(00) 00000-0000"
                  {...form.getInputProps('phone')}
                />
                <Checkbox
                  mt="md"
                  label="I agree to sell my privacy"
                  {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                />
                <Button ml={73} type="submit">
                  Submit
                </Button>
              </SimpleGrid>
            </form>
          </>
        )}
      </Container>
    </>
  );
}
