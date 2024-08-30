import AsyncStorage from '@react-native-async-storage/async-storage'

import { GROUP_COLLECTION } from '@storage/storageConfig'

import { groupsGetAll } from './groupsGetAll'

export async function groupRemove(item: string) {
  try {
    const storedGroups = await groupsGetAll()

    const updatedGroups = storedGroups.filter((group) => group !== item)

    return await AsyncStorage.setItem(
      GROUP_COLLECTION,
      updatedGroups.length === 0 ? JSON.stringify(updatedGroups) : ''
    )
  } catch (error) {
    throw error
  }
}
