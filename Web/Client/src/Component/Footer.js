import React from 'react';
import ContactForm from './ContactForm';
import Disclaimer from './Disclaimer';
import '../Styles/Footer.css';
import Sitemap from './Sitemap';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        //feedback/contact us
        //sitemap
        //disclaimer
        //created by
        return (
            <div className="footer">
                <ContactForm {...this.props} />
                <Sitemap {...this.props} />
                <Disclaimer {...this.props} />
            </div>
        )
    }
}