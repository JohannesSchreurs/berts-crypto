import styles from './CryptosList.module.scss';
import CrytpoListItem from '../CryptoListItem/CryptoListItem';

const CryptosList = ({ list }) => {
    return (
        <ul className={styles.list}>
            { list.map(({ id, title, slug, date }, index) => (<CrytpoListItem key={id} id={id} title={title} slug={slug} date={date} isFirst={index === 0} />))}    
        </ul>
    )
}

export default CryptosList;