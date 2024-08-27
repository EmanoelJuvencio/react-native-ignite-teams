import { TouchableOpacityProps } from 'react-native'
import { Container, Icon, Title } from './styles'

type TGroupCardProps = TouchableOpacityProps & {
  title: string
}

export function GroupCard({ title, ...rest }: TGroupCardProps) {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  )
}
