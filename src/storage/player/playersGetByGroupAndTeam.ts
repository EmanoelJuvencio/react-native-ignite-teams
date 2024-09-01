import { playersGetByGroup } from './playersGetByGroup'

export async function playersGetByGroupAndTeam(group: string, team: String) {
  try {
    const players = await playersGetByGroup(group)

    return players.filter((players) => players.team === team)
  } catch (error) {
    throw error
  }
}
