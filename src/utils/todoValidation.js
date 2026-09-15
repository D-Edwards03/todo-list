export const MAX_TODO_LENGTH = 100;

export function isValidTodoTitle(title) {
    if (!title || title.trim() === '') return false;
    if (title.length > MAX_TODO_LENGTH) return false;
    
    // Basic sanitization/validation: reject strings containing HTML angle brackets
    const hasUnsafeChars = /[<>]/.test(title);
    if (hasUnsafeChars) return false;

    return true;
}

export function getTodoValidationError(title) {
    if (!title || title.trim() === '') return ''; // Don't show error before they type
    if (title.length > MAX_TODO_LENGTH) return `Must be ${MAX_TODO_LENGTH} characters or less.`;
    if (/[<>]/.test(title)) return 'Characters < and > are not allowed.';
    return '';
}