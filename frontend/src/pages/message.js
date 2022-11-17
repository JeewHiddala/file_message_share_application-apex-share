import React, { Component } from 'react';
import axios from 'axios';

var CryptoJS = require("crypto-js");

const initialState = {  //initiate states
    message: '',
    id: ''

}

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this); //bind onChange function.
        this.onSubmit = this.onSubmit.bind(this);
    }


    componentDidMount() {

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        let key = 'cQfTjWnZr4u7x!A%D*G-KaNdRgUkXp2s';
        let iv = '4565777a72ddc2f1';
        let cipher = CryptoJS.AES.encrypt(JSON.stringify(this.state.message), CryptoJS.enc.Utf8.parse(key), {
            iv: CryptoJS.enc.Utf8.parse(iv),
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });

        let message = {
            message: cipher.toString(),

        }
        console.log('DATA TO SEND', message);

        axios.post('http://localhost:4444/message/create', message)
            .then(response => {
                alert('Data successfully inserted');
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })

    }

    render() {
        return (

            <div className="container"><br />

                <h2>New Message  </h2>
                <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "left" }}>

                </h5>

                <form onSubmit={this.onSubmit} >

                    <div className={"row"}>
                        <div className={"col-md-6"}>


                            <div className="col-10" style={{ textAlign: "left" }}>
                                <label htmlFor="message" className="form-label">Enter Message</label>
                                <textarea
                                    type="text"
                                    rows="3"
                                    className="form-control"
                                    id="message"
                                    name="message"
                                    required
                                    value={this.state.message}
                                    onChange={this.onChange}
                                />
                            </div>
                            <br></br>
                            <br></br>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                    <br>
                    </br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br><br></br>
                    <br></br>
                </form>


            </div>
        )
    }
}
export default Message;