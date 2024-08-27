import { TouchableOpacityProps } from 'react-native'
import { Container, TButtonTypeStyleProps, Title } from './styles'

type TButtonProps = TouchableOpacityProps & {
  title: string
  type?: TButtonTypeStyleProps
}

export function Button({ type = 'PRIMARY', title, ...rest }: TButtonProps) {
  return (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
