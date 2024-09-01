import { useEffect, useState } from 'react'
import { Alert, FlatList, Keyboard } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { AppError } from '@utils/AppError'

import { TPlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playerAddByGroup } from '@storage/player/PlayerAddByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam'
import { groupRemove } from '@storage/group/groupRemove'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

import { Container, Form, HeaderList, NumberOfPlayers } from './styles'

type TRouteParams = {
  group: string
}

export function Players() {
  const [team, setTeam] = useState('Time A')
  const route = useRoute()
  const { group } = route.params as TRouteParams

  const navigation = useNavigation()
  const [newPlayerName, setNewPlayerName] = useState('')
  const [players, setPlayers] = useState<TPlayerStorageDTO[]>([])

  async function handleGroupRemove(item: string) {
    try {
      await groupRemove(item)
      navigation.navigate('groups')
    } catch (error) {
      console.error(error)
    }
  }

  async function handleAddPlayer() {
    try {
      if (newPlayerName.trim().length === 0) {
        return Alert.alert('Nova Pessoa', 'Informe o nome do jogador.')
      }

      const newPlayer: TPlayerStorageDTO = {
        name: newPlayerName,
        team,
      }

      await playerAddByGroup(newPlayer, group)
      setNewPlayerName('')
      Keyboard.dismiss()
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Nova Pessoa', error.message)
      }

      Alert.alert('Nova Pessoa', 'Não foi possível adicionar um novo jogador.')
      console.log(error)
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const data = await playersGetByGroupAndTeam(group, team)
      setPlayers(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [players, team])

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle='Adicione a galera e separe os times' />
      <Form>
        <Input
          placeholder='Nome da Pessoa'
          autoCorrect={false}
          keyboardAppearance='dark'
          value={newPlayerName}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon
          icon='add'
          type='PRIMARY'
          onPress={() => handleAddPlayer()}
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
                setTeam(item)
              }}
            />
          )}
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
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
        style={{ marginTop: 20 }}
        onPress={() => handleGroupRemove(group)}
      />
    </Container>
  )
}
