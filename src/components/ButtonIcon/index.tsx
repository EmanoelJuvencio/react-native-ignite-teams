import { Container, Icon, TButtonIconProps } from './styles'

export function ButtonIcon({
  icon = 'rocket-launch',
  type,
  ...rest
}: TButtonIconProps) {
  return (
    <Container {...rest}>
      <Icon name={icon} type={type} />
    </Container>
  )
}
