import { Header } from '@components/Header'
import { Container, Form } from './styles'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { View } from 'react-native'
import { Rows } from 'phosphor-react-native'

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

      <Filter title='Time A' isActive />
    </Container>
  )
}
