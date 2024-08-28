import { Header } from '@components/Header'
import { Container, Form } from './styles'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'

export function Players() {
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title='Nome da Turma'
        subtitle='Adicione a galera e separe os times'
      />

      <Form>
        <Input
          placeholder='Nome da Pessoa'
          autoCorrect={false}
          keyboardAppearance='dark'
        />
        <ButtonIcon icon='add' type='PRIMARY' />
      </Form>
    </Container>
  )
}
