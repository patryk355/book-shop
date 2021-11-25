import { useSelector } from 'react-redux';
import Book from './Book';
import styles from './Books.module.css';

const Books = () => {
    const books = useSelector(state => state.books.items);

    return (
        <section className={styles.books}>
            <ul>
                {books.map(({ id, title, author, description, price, image_url }) => (
                    <Book
                        key={id}
                        id={id}
                        title={title}
                        author={author}
                        description={description}
                        price={price}
                        image_url={image_url}
                    />
                ))}
            </ul>
        </section>
    )
}

export default Books;