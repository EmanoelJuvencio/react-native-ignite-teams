import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'

import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  function handleNewGroup() {
    console.log('aow')

    navigation.navigate('players', { group })
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
