import { ReactElement } from 'react';
import './MainContent.css';
import { BoroughSelector, AttributeSelector } from '..';

export default (): ReactElement => {

    return (
        <section className="MainContent">
            <div className="banner">MAIN CONTENT</div>
            <BoroughSelector/>
            <div className="divider">OR</div>
            <AttributeSelector/>
        </section>
    )
}