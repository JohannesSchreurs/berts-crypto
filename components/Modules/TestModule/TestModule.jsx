import {useStoreon} from 'storeon/react';

import styles from './TextModule.module.css';

const TestModule = () => {
    const { crypto } = useStoreon('crypto');

    return (
        <>
            <p className={`${styles.title} wrapper`}>{ crypto.cryptoEntry.title }</p>
        </>
    )
}

export default TestModule;