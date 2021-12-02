import './MainContent.css';
import { Restaurant } from '..';

export default () => {

    return (
        <section className="MainContent">
            <div className="banner">MAIN CONTENT</div>
            <>
                <div className="vertical">
                    <Restaurant/>
                </div>
                <Restaurant/>
                <div className="horizontal">
                    <Restaurant/>
                </div>
                <Restaurant/>
                <Restaurant/>
                <div className="horizontal">
                    <Restaurant/>
                </div>
                <Restaurant/>
                <div className="vertical">
                    <Restaurant/>
                </div>
                <Restaurant/>
                <Restaurant/>
                <div className="horizontal">
                    <Restaurant/>
                </div>
                <Restaurant/>
                <Restaurant/>
                <Restaurant/>
                <Restaurant/>
            </>
        </section>
    )
}