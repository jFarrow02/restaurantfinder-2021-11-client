import './Modal.css';

interface ModalPropsInterface {
    children?: string | JSX.Element | null,
    onClick: Function,
}

const Modal = (props:ModalPropsInterface) => {
    const {
        children,
        onClick,
    } = props;

    return (
        <article className='Modal'>
            <button onClick={() => {onClick(false)}}>X</button>
            {children && children}
        </article>
    );
};

export default Modal;