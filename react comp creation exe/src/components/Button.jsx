function Button({ type, text, onClick }) {
    let colorClass = 'btn-default';

    if (type === 'Friend') {
        colorClass = 'btn-friend';
    } else if (type === 'Teacher') {
        colorClass = 'btn-teacher';
    } else if (type === 'Student') {
        colorClass = 'btn-student';
    }
    return (
        <button className={`btn ${colorClass}`} onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;