import Container from './Container'

/**
 * Section
 * Padroniza o espaçamento vertical entre seções: 50px no mobile, 100px
 * (--spacing-section) a partir do lg — ver design/tokens.md. Envolve o
 * conteúdo em um Container, salvo quando `container={false}`.
 */
function Section({
  id,
  as: Tag = 'section',
  container = true,
  containerClassName = '',
  className = '',
  children,
  ...props
}) {
  return (
    <Tag id={id} className={`py-12.5 lg:py-section ${className}`.trim()} {...props}>
      {container ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </Tag>
  )
}

export default Section
