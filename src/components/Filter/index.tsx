import { Container, TFilterStyleProps, Title } from './styles'

type TFilterProps = TFilterStyleProps & {
  title?: string
}

export function Filter({ title, isActive = false, ...rest }: TFilterProps) {
  return (
    <Container {...rest} isActive={isActive}>
      <Title isActive={isActive}>{title}</Title>
    </Container>
  )
}
