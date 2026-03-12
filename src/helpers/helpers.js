export const validateTaskTitle = (title) => {
  let errorMessage = ''
  const MIN_TITLE_LENGTH = 2
  const MAX_TITLE_LENGTH = 64
  if (title.length === 0) {
    errorMessage = 'Это поле не может быть пустым'
  } else if (title.length < MIN_TITLE_LENGTH) {
    errorMessage = 'Минимальная длина текста 2 символа'
  } else if (title.length > MAX_TITLE_LENGTH) {
    errorMessage = 'Максимальная длина текста 64 символа'
  }

  return errorMessage
}
