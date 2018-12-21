const acceptValue = ['input', 'textarea', 'option', 'select']

export default (tag, type, attr) => {
  return (
    (attr === 'value' && acceptValue.includes(tag) && type !== 'button') ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
}
