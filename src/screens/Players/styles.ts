import { css } from 'styled-components'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`

export const Form = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: center;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`
export const HeaderList = styled.View`
  width: 100%;
  margin: 32px 0 12px;

  align-items: center;
  flex-direction: row;
`

export const NumbersOfPlayers = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
  `}
`
