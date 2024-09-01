import AsyncStorage from '@react-native-async-storage/async-storage'

import { PLAYER_COLLECTION } from '@storage/storageConfig'

import { TPlayerStorageDTO } from './PlayerStorageDTO'

export async function playerAddByGroup(
  newPlayer: TPlayerStorageDTO,
  group: String
) {
  try {
    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify(newPlayer)
    )
  } catch (error) {
    throw error
  }
}
