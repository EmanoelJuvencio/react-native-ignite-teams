import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'

import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'

import { groupCreate } from '@storage/group/groupCreate'

import { AppError } from '@utils/AppError'

import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  async function handleNewGroup() {
    try {
      if (group.trim() === '') {
        return Alert.alert('Informe o nome da Turma para continuar!')
      }

      await groupCreate(group.trim())
      navigation.navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Nova Turma', error.message)
      }

      Alert.alert('Nova Turma', 'Não foi possível criar uma nova turma.')
      console.log(error)
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title='Nova Turma'
          subtitle='Crie a turma para adicionar pessoas'
        />
        <Input
          placeholder='Nome da Turma'
          keyboardAppearance='dark'
          onChangeText={setGroup}
        />
        <Button
          title='Criar'
          style={{ marginTop: 20 }}
          onPress={() => handleNewGroup()}
        />
      </Content>
    </Container>
  )
}
