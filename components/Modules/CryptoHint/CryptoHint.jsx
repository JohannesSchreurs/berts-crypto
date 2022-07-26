import { useState, useEffect } from 'react';
import { useStoreon } from 'storeon/react';
import { useRouter } from 'next/router'

import styles from './CryptoHint.module.scss';

const CryptoHint = ({ index }) => {
    const { query } = useRouter();
    const { solution } = useStoreon('solution');
    const [hint, setHint] = useState(solution[query.slug]?.hintLetters[index] || "");
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true);
        setHint(solution[query.slug]?.hintLetters[index] || '')
    
    }, [solution[query.slug]?.hintLetters[index]]);

    if (!hasMounted) {
        return null;
    }

    return (
        <li className={styles.wrapper}>
            <p className={styles.header}>{ index }</p>
            <p className={styles.content}>{ hint }</p>
        </li>
    )
}

export default CryptoHint;