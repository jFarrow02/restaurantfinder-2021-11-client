import './Modal.css';

const Modal = (props:any) => {
    const {
        children,
    } = props;
    
    return (
        <article className='Modal'>
            {children}
        </article>
    );
};

export default Modal;