import styles from './CryptoHeader.module.scss';

const CryptoHeader = ({ title, date }) => {
    const formattedDate = new Date(date).toLocaleDateString();

    return (
        <>
            <time className={styles.date} datatime={formattedDate}>
                { formattedDate }
            </time>
            <h1 className={styles.title}>{ title }</h1>
        </>
    )
}

export default CryptoHeader;