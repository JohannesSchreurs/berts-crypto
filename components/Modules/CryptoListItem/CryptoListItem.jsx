import Link from 'next/link';
import styles from './CryptoListItem.module.scss';

const CrytpoListItem = ({ id, title, slug, date, isFirst }) => {
    const formattedDate = new Date(date).toLocaleDateString();

    return (
        isFirst ? (
            <li key={id} className={`${styles.listItem} ${styles.listItemFirst}`}>
                <p className={styles.subTitle}>Laatste crypto:</p>
                <p className={styles.title}>{title}</p>
                <Link href={`/cryptos/${slug}`}>
                    <a className={styles.start}>
                        Beginnen
                    </a>
                </Link>
            </li>
        ) : (
            <li key={id} className={styles.listItem}>
                <time className={styles.date} datatime={formattedDate}>
                    { formattedDate }
                </time>
                <Link href={`/cryptos/${slug}`}>
                    <a className={styles.title}>
                        { title }
                    </a>
                </Link>
            </li>
        )
    )
}

export default CrytpoListItem;