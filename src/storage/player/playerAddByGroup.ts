import AsyncStorage from '@react-native-async-storage/async-storage'

import { PLAYER_COLLECTION } from '@storage/storageConfig'

import { TPlayerStorageDTO } from './PlayerStorageDTO'
import { playersGetByGroup } from './playersGetByGroup'
import { AppError } from '@utils/AppError'

export async function playerAddByGroup(
  newPlayer: TPlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await playersGetByGroup(group)

    const playerAlreadyExists = storedPlayers.filter(
      (player) => player.name === newPlayer.name
    )

    if (playerAlreadyExists.length > 0) {
      throw new AppError(
        'Esta pessoa já foi adicionado em um time desta Turma.'
      )
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error
  }
}
