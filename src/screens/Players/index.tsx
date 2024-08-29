import { Header } from '@components/Header'
import { Container, Form, HeaderList, NumbersOfPlayers } from './styles'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { FlatList } from 'react-native'
import { useState } from 'react'

export function Players() {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState(['Emanoel', 'Teste', 'ABC'])

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

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          horizontal
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />

        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>
    </Container>
  )
}
