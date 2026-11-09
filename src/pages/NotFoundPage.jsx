import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
export default function NotFoundPage(){return <section className={styles.page}><h1>Page not found</h1><p>The memory you were looking for could not be found.</p><Link to="/">Return home</Link></section>}
