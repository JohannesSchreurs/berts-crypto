import { useState, useEffect } from 'react';

import Link from 'next/link';
import styles from './CryptoListItem.module.scss';

const CrytpoListItem = ({ id, title, slug, date, isFirst }) => {
    const [_date, setDate] = useState(date);
    
    useEffect(() => {
        setDate(() => new Date(date).toLocaleDateString());
    }, []);

    return (
        isFirst ? (
            <li key={id} className={styles.listItem}>
                <time datatime={_date}>
                    { _date }
                </time>
                <Link href={`/cryptos/${slug}`}>
                    
                    { `${title} first` }
                </Link>
            </li>
        ) : (
            <li key={id} className={styles.listItem}>
                <time datatime={_date}>
                    { _date }
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