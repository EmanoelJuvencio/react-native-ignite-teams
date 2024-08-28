import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'
import { DefaultTheme } from 'styled-components/native/dist/types'

type TButtonIconTypeStyleProps = 'PRIMARY' | 'SECONDARY'

type TIconsGliphName = keyof typeof MaterialIcons.glyphMap

export type TButtonIconProps = TouchableOpacityProps & {
  icon?: TIconsGliphName
  type?: TButtonIconTypeStyleProps
}

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;

  justify-content: center;
  align-items: center;

  margin-left: 12px;
`
export const Icon = styled(MaterialIcons).attrs<TButtonIconProps>(
  ({ theme, type }) => ({
    size: 24,
    color: getIconColor(type, theme),
  })
)``

function getIconColor(
  type: TButtonIconTypeStyleProps | undefined,
  theme: DefaultTheme
) {
  switch (type) {
    case 'PRIMARY':
      return theme.COLORS.GREEN_700
    case 'SECONDARY':
      return theme.COLORS.RED
    default:
      return theme.COLORS.GRAY_200
  }
}
