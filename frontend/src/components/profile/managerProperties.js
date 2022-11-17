import React, { useState, useEffect } from 'react'
import AuthService from '../../services/auth.service'
// import UserService from '../../services/user.service'
import axios from 'axios'
import Swal from 'sweetalert2'
import CryptoJS from 'crypto-js'
// var CryptoJS = require("crypto-js");

import './profile-styles.css'

const UpdateProfileImage = () => {
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')
  const [messageInput, setMessageInput] = useState('')
  //   const [managerId, setManagerId] = useState('')

  useEffect(() => {
    if (url) {
      let currentUser = AuthService.getCurrentUser()
      console.log('id', currentUser.id)
      let file_url = url

      var cipher_fileUrl = CryptoJS.AES.encrypt(
        JSON.stringify(file_url),
        'secret key 123'
      ).toString()

      let profile = {
        fileUrl: cipher_fileUrl,
        managerId: currentUser.id,
      }
      console.log('DATA TO SEND', cipher_fileUrl)
      axios
        .post(`http://localhost:4444/file/upload`, profile)
        .then((response) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'File has been uploaded',
            showConfirmButton: false,
            timer: 1500,
          })
          //   window.location = '/profile'
        })
        .catch((error) => {
          console.log('xxx', error.message)
          //alert(error.message)
        })
    }
  }, [url])

  const uploadImage = () => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'skylight-web')
    data.append('cloud_name', 'svxzwylz')
    fetch('https://api.cloudinary.com/v1_1/svxzwylz/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUrl(data.url)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // onsub
  const onSubmit = (e) => {
    console.log('msg Submit', messageInput)
    e.preventDefault()

    let key = 'cQfTjWnZr4u7x!A%D*G-KaNdRgUkXp2s'
    let iv = '4565777a72ddc2f1'
    let cipher = CryptoJS.AES.encrypt(
      JSON.stringify(messageInput),
      CryptoJS.enc.Utf8.parse(key),
      {
        iv: CryptoJS.enc.Utf8.parse(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
      }
    )

    let message = {
      message: cipher.toString(),
    }
    console.log('DATA TO SEND', message)

    axios
      .post('http://localhost:4444/message/create', message)
      .then((response) => {
        alert('Data successfully inserted')
      })
      .catch((error) => {
        console.log(error.message)
        alert(error.message)
      })
  }

  return (
    <div>
      <h4 className="mgtprop">Manager Properties</h4>
      <div className="container-form">
        <div>
          <h5>Upload File</h5>
          <div className="container">
            <div className="row">
              <form>
                <br />
                <br />
                <div className="input-group mb-3">
                  <button
                    className="btn btn-warning"
                    type="button"
                    id="inputGroupFileAddon03"
                    onClick={() => uploadImage()}
                  >
                    Upload
                  </button>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="form-control"
                    id="inputGroupFile03"
                    aria-describedby="inputGroupFileAddon03"
                    aria-label="Upload"
                  />
                </div>

                <br />
                <br />
              </form>
              <div className="container">
                <h5>New Message </h5>
                <h5
                  htmlFor="content"
                  className="form-label mb-4"
                  style={{ textAlign: 'left' }}
                ></h5>

                <form>
                  <div className={'row'}>
                    <div className={'col-md-6'}>
                      <div className="col-10" style={{ textAlign: 'left' }}>
                        <label htmlFor="message" className="form-label">
                          Enter Message
                        </label>
                        <textarea
                          type="text"
                          rows="3"
                          className="form-control"
                          id="message"
                          name="message"
                          required
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                        />
                      </div>
                      <br></br>
                      <br></br>

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => onSubmit(e)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  <br></br>
                  <br></br>
                  <br></br>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfileImage
