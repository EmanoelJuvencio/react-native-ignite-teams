import styled, { css } from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'

export const Container = styled.View`
  width: 100%;
  height: 56px;

  flex-direction: row;
  border-radius: 6px;

  margin-bottom: 16px;
  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
`

export const Name = styled.Text`
  flex: 1;

  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`

export const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
  size: 24,
  color: theme.COLORS.GRAY_100,
}))`
  margin-left: 16px;
  margin-right: 8px;
`
