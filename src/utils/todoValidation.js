export const MAX_TODO_LENGTH = 100;

export function isValidTodoTitle(title) {
  if (!title || title.trim() === '') return false;

  const trimmed = title.trim();

  if (trimmed.length > MAX_TODO_LENGTH) return false;

  // Reject actual HTML tags, not math symbols
  const hasUnsafeHtml = /<\/?[a-z][\s\S]*>/i.test(trimmed);
  if (hasUnsafeHtml) return false;

  return true;
}

export function getTodoValidationError(title) {
  if (!title || title.trim() === '') return '';

  const trimmed = title.trim();

  if (trimmed.length > MAX_TODO_LENGTH)
    return `Must be ${MAX_TODO_LENGTH} characters or less.`;

  if (/<\/?[a-z][\s\S]*>/i.test(trimmed))
    return 'HTML tags are not allowed.';

  return '';
}
