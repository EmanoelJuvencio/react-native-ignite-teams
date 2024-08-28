import { TouchableOpacity } from 'react-native'
import { css } from 'styled-components/native'
import styled from 'styled-components/native'

export type TFilterStyleProps = {
  isActive?: boolean
}

export const Container = styled(TouchableOpacity)<TFilterStyleProps>`
  ${({ theme, isActive }) =>
    isActive &&
    css`
      border: 1px solid ${theme.COLORS.GREEN_700};
    `};

  border-radius: 4px;
  margin-right: 12px;

  height: 38px;
  width: 70px;

  align-items: center;
  justify-content: center;
`

export const Title = styled.Text<TFilterStyleProps>`
  text-transform: uppercase;

  ${({ theme, isActive }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${isActive ? theme.COLORS.WHITE : theme.COLORS.GRAY_200};
  `};
`
