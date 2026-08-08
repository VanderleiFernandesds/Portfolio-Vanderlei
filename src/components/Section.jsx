import Container from './Container'

/**
 * Section
 * Padroniza o espaçamento vertical entre seções (120px, ver design/tokens.md)
 * e envolve o conteúdo em um Container, salvo quando `container={false}`.
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
    <Tag id={id} className={`py-section ${className}`.trim()} {...props}>
      {container ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </Tag>
  )
}

export default Section
