import { useSearchParams } from 'react-router';
import formStyles from "../shared/Forms.module.css";

function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get('status') || 'all';

  const handleStatusChange = (status) => {
    const newParams = new URLSearchParams(searchParams);

    if (status === 'all') {
      newParams.delete('status');
    } else {
      newParams.set('status', status);
    }

    setSearchParams(newParams);
  };

  return (
    <div className={`${formStyles.inputGroup} ${formStyles.inputGroupSpacing}`}>
      <label htmlFor="statusFilter" className={formStyles.label}>
        Show:
      </label>

      <select
        id="statusFilter"
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
        className={formStyles.input}
      >
        <option value="all">All Todos</option>
        <option value="active">Active Todos</option>
        <option value="completed">Completed Todos</option>
      </select>
    </div>
  );
}

export default StatusFilter;
