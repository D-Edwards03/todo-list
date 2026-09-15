import styles from "./About.module.css";

function AboutPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.mainHeading}>About This App</h2>
      <p className={styles.description}>
        This Todo application is designed to help users effectively manage their daily tasks, 
        stay organized, and maintain productivity through a clean and responsive interface.
      </p>

      <section className={styles.sectionCard}>
        <h3 className={styles.subHeading}>App Features</h3>
        <ul className={styles.featureList}>
          <li>Secure user authentication and protected routes</li>
          <li>Create, read, update, and delete (CRUD) operations for tasks</li>
          <li>Real-time state management for instant UI updates</li>
          <li>Advanced filtering and sorting capabilities</li>
          <li>Persistent data storage connected to a backend REST API</li>
        </ul>
      </section>

      <section className={styles.sectionCard}>
        <h3 className={styles.subHeading}>Technologies Used</h3>
        <ul className={styles.featureList}>
          <li>
            <strong>React:</strong> Powers the dynamic, component-driven user interface and complex state management.
          </li>
          <li>
            <strong>React Router v7:</strong> Handles seamless client-side routing, protected navigation flows, and redirection.
          </li>
          <li>
            <strong>Vite:</strong> Provides a blazing-fast local development environment and optimized production builds.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default AboutPage;