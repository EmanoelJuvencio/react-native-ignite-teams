import { useEffect, useRef, useState } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { AppError } from '@utils/AppError'

import { TPlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'

import { Container, Form, HeaderList, NumberOfPlayers } from './styles'

type TRouteParams = {
  group: string
}

export function Players() {
  const route = useRoute()
  const { group } = route.params as TRouteParams

  const navigation = useNavigation()

  const [team, setTeam] = useState('Time A')
  const [newPlayerName, setNewPlayerName] = useState('')
  const [players, setPlayers] = useState<TPlayerStorageDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const newPlayerNameInputRef = useRef<TextInput>(null)

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
      newPlayerNameInputRef?.current?.blur()
      setNewPlayerName('')
      fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Nova Pessoa', error.message)
      }

      Alert.alert('Nova Pessoa', 'Não foi possível adicionar um novo jogador.')
      console.log(error)
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (error) {
      console.log(error)
      Alert.alert('Remover Pessoa', 'Não foi possível remover esta pessoa.')
    }
  }

  async function handleGroupRemove() {
    Alert.alert('Remover Turma', 'Deseja Remover a turma?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: () => {
          groupRemove()
        },
      },
    ])
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)
      navigation.navigate('groups')
    } catch (error) {
      console.log(error)
      Alert.alert('Remover Turma', 'Não foi possível remover esta Turma.')
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)
      const data = await playersGetByGroupAndTeam(group, team)
      setPlayers(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

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
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
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

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handlePlayerRemove(item.name)}
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
      )}

      <Button
        title='Remover Turma'
        type='SECONDARY'
        style={{ marginTop: 20 }}
        onPress={() => handleGroupRemove()}
      />
    </Container>
  )
}
