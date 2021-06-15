import cardStyle from '../styles/BookCard.module.css'

export default function BookCard({ entry, onIncrement, onDecrement, onInfoClick, onDelete }) {

    return (
        <div className={cardStyle.wrap}>
            <div className={cardStyle.list}>
                <p title={entry.title} className={cardStyle.title}>
                    {entry.title}
                </p>
                <img className={cardStyle.cover} src={entry.coverUrl} />
                <div className={cardStyle.details}>
                    <div>
                        <span className={cardStyle.status}>
                            Current Chapter: {entry.chapter}
                        </span>
                        <hr />
                        <a
                            onClick={onIncrement}
                            title="Increase Progress"
                            className="fas fa-plus"
                        />
                        <a
                            onClick={onDecrement}
                            title="Decrease Progress"
                            className="fas fa-minus"
                        />
                        <a onClick={onInfoClick} title="Info" className="fas fa-info" />
                        <a
                            onClick={onDelete}
                            title="Delete Book"
                            style={{ color: '#e33131' }}
                            className="fas fa-trash-alt"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}