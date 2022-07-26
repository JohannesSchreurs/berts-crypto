import CryptoHint from '../CryptoHint/CryptoHint';

import styles from './CryptoHints.module.scss';

const CryptoHints = () => {
    return (
        <section className={styles.wrapper} aria-labelledby='letterbak'>
            <div className={styles.content}>
                <h2 id='letterbak'>Letterbak</h2>
                <ol className={styles.hints}>
                    {
                        [...Array(26)].map((hintItem, index) => (
                            <CryptoHint key={index} index={index + 1} />
                        ))
                    }
                </ol>
            </div>
        </section>
    )
}

export default CryptoHints;