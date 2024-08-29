import { FlatList } from 'react-native'
import { useState } from 'react'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

import { Container, Form, HeaderList, NumberOfPlayers } from './styles'

export function Players() {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState([
    'Emanoel',
    'Ana',
    'Leonardo',
    'Mayco',
    'Gobo',
    'Barzon',
    'Teste',
    'Teste 2',
    'Teste 3',
  ])

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
        <ButtonIcon
          icon='add'
          type='PRIMARY'
          onPress={() => console.log('Clicou para ADD uma pessoa')}
        />
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
              onPress={() => {
                console.log('Clicou Para mudar para o =>', item)

                setTeam(item)
              }}
            />
          )}
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
            onRemove={() => console.log('Clicou para remover => ', item)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message='Não há pessoas neste time.' />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button
        title='Remover Turma'
        type='SECONDARY'
        style={{ marginTop: 10 }}
        onPress={() => console.log('Clicou Para Remover Turma')}
      />
    </Container>
  )
}
