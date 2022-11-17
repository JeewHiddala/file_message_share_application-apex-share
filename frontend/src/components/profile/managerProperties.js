import React, { useState, useEffect } from 'react'
import AuthService from '../../services/auth.service'
// import UserService from '../../services/user.service'
import axios from 'axios'
import Swal from 'sweetalert2'
import CryptoJS from 'crypto-js'

import './profile-styles.css'

const UpdateProfileImage = () => {
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')
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
        managerId: currentUser.id
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

                {/* <div className="file-field input-field" style={{ margin: "10px" }}>
                                        <div className="btn #64b5f6 blue darken-1">
                                            <span>Update pic</span>
                                            <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
                                        </div>
                                        <div className="file-path-wrapper">
                                            <input className="file-path validate" type="text" />
                                        </div>
                                    </div> */}
                <br />
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container-form">
        <div>
          <h5>Messaging</h5>
          <div className="container">
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfileImage
