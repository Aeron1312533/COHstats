import React from 'react';
import '../Styles/ContactForm.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: ''
        }
    }

    render() {
        return (
            <div className="contactFormWrapper">
                <h3>Contact Us</h3>
                <form id="contactForm" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="form-group">
                        <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange.bind(this)} placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" value={this.state.message} onChange={this.onMessageChange.bind(this)} placeholder="Message"/>
                    </div>
                    <button type="submit" className="contactFormButton"></button>
                </form>
            </div>
        );
    }

    onNameChange(event) {
        this.setState({ name: event.target.value })
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value })
    }

    onMessageChange(event) {
        this.setState({ message: event.target.value })
    }

    handleSubmit(event) {
    }
}
