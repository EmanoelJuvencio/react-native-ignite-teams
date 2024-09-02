import { TextInput, TextInputProps } from 'react-native'
import { Container } from './styles'
import { useTheme } from 'styled-components/native'

type TInputProps = TextInputProps & {
  inputRef?: React.RefObject<TextInput>
}

export function Input({ inputRef, ...rest }: TInputProps) {
  const { COLORS } = useTheme()

  return (
    <Container
      {...rest}
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
    />
  )
}
