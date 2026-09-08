export const TODO_ACTIONS = {
  // Fetch operations
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',

  // Add todo operations
  ADD_TODO_START: 'ADD_TODO_START',
  ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
  ADD_TODO_ERROR: 'ADD_TODO_ERROR',

  // Complete todo operations
  COMPLETE_TODO_START: 'COMPLETE_TODO_START',
  COMPLETE_TODO_SUCCESS: 'COMPLETE_TODO_SUCCESS',
  COMPLETE_TODO_ERROR: 'COMPLETE_TODO_ERROR',

  // Update todo operations
  UPDATE_TODO_START: 'UPDATE_TODO_START',
  UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
  UPDATE_TODO_ERROR: 'UPDATE_TODO_ERROR',

  // UI operations
  SET_SORT: 'SET_SORT',
  SET_FILTER: 'SET_FILTER',
  CLEAR_ERROR: 'CLEAR_ERROR',
  RESET_FILTERS: 'RESET_FILTERS'
};

export const initialTodoState = {
    todoList: [],
    error: "",
    filterError: "",
    isTodoListLoading: true,
    sortBy: 'createdAt',
    sortDirection: 'asc',
    filterTerm: "",
    dataVersion: 0
};

export function todoReducer(state, action) {
  switch (action.type) {
    // --- FETCH OPERATIONS ---
    case TODO_ACTIONS.FETCH_START:
      return {
        ...state,
        isTodoListLoading: true,
        error: '',
        filterError: '',
      };

    case TODO_ACTIONS.FETCH_SUCCESS:
      // Expects action.payload to be the fetched tasks array
      return {
        ...state,
        todoList: action.payload,
        isTodoListLoading: false,
        filterError: '',
      };

    case TODO_ACTIONS.FETCH_ERROR:
      // Expects action.payload to be an object: { message, isFilterError }
      return {
        ...state,
        isTodoListLoading: false,
        error: action.payload.isFilterError ? state.error : action.payload.message,
        filterError: action.payload.isFilterError ? action.payload.message : state.filterError,
      };

    // --- ADD TODO OPERATIONS ---
    case TODO_ACTIONS.ADD_TODO_START:
      // Expects action.payload to be the tempTodo object
      return {
        ...state,
        error: '',
        todoList: [action.payload, ...state.todoList],
      };

    case TODO_ACTIONS.ADD_TODO_SUCCESS:
      // Expects action.payload to be an object: { tempId, realTodo }
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.isTemp && todo.id === action.payload.tempId ? action.payload.realTodo : todo
        ),
        dataVersion: state.dataVersion + 1, // Replaces invalidateCache()
      };

    case TODO_ACTIONS.ADD_TODO_ERROR:
      // Expects action.payload to be an object: { tempId, error }
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo.id !== action.payload.tempId),
        error: action.payload.error,
      };

    // --- COMPLETE TODO OPERATIONS ---
    case TODO_ACTIONS.COMPLETE_TODO_START:
      // Expects action.payload to be the id of the todo being completed
      return {
        ...state,
        error: '',
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload ? { ...todo, isCompleted: true } : todo
        ),
      };

    case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
      // Just needs to trigger the cache invalidation
      return {
        ...state,
        dataVersion: state.dataVersion + 1,
      };

    case TODO_ACTIONS.COMPLETE_TODO_ERROR:
      // Expects action.payload to be an object: { originalTodo, error }
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.originalTodo.id ? action.payload.originalTodo : todo
        ),
        error: action.payload.error,
      };

    // --- UPDATE TODO OPERATIONS ---
    case TODO_ACTIONS.UPDATE_TODO_START:
      // Expects action.payload to be the editedTodo object
      return {
        ...state,
        error: '',
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };

    case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
      // Just needs to trigger the cache invalidation
      return {
        ...state,
        dataVersion: state.dataVersion + 1,
      };

    case TODO_ACTIONS.UPDATE_TODO_ERROR:
      // Expects action.payload to be an object: { originalTodo, error }
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.originalTodo.id ? action.payload.originalTodo : todo
        ),
        error: action.payload.error,
      };

    // --- UI OPERATIONS ---
    case TODO_ACTIONS.SET_SORT:
      // Expects action.payload to be an object: { sortBy, sortDirection }
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortDirection: action.payload.sortDirection,
      };

    case TODO_ACTIONS.SET_FILTER:
      // Expects action.payload to be the new filter string
      return {
        ...state,
        filterTerm: action.payload,
      };

    case TODO_ACTIONS.CLEAR_ERROR:
      // Expects action.payload to be either "error" or "filterError"
      return {
        ...state,
        error: action.payload === 'error' ? '' : state.error,
        filterError: action.payload === 'filterError' ? '' : state.filterError,
      };

    case TODO_ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filterTerm: '',
        sortBy: 'createdAt',
        sortDirection: 'desc',
        filterError: '',
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};