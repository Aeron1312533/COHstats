import React from 'react';
import ContactForm from './ContactForm';
import '../Styles/Footer.css';

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
                Copyright © 2020 coh2stats.online
                <ContactForm {...this.props} />
            </div>
        )
    }
}