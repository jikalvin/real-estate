import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { storage } from '../firebase';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uuidv4 } from '@firebase/util';
import { useHouses } from '../Files/getData';

import { doc, setDoc, deleteDoc } from 'firebase/firestore';

import { Button, Form } from 'react-bootstrap';
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"

export default function Dash() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { houses, isLoading } = useHouses();

  const [address, setAddress] = useState()
  const [name, setName] = useState()
  const [country, setCountry] = useState()
  const [bedrooms, setBedrooms] = useState()
  const [type, setType] = useState()
  const [bathrooms, setBathrooms] = useState()
  const [image, setImage] = useState()
  const [surface, setSurface] = useState()
  const [date, setDate] = useState()
  const [price, setPrice] = useState()
  const [description, setDescription] = useState()

  const [percent, setPercent] = useState()
  const [i, setI] = useState()


  const signedOut = () => toast("You are signed out");
  const added = () => toast("House has been added!");
  const deleted = () => toast("House has been Deleted!");

  function handleUpload() {
    if (!image) {
        alert("Please choose a image first!")
    }
 
    const storageRef = ref(storage, `/images/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
          const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
      },
      (err) => console.log(err),
      () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
              setI(url)
          });
      }
  ); 
  }

  function handleLogout(){
    signOut(auth).then(() => {
      signedOut()
      navigate("/")
      console.log("Signed Out")
    }).catch((error) => {
      console.log("Error Occurred")
    });
  }

  async function handleDelete(id){
    console.log(id)
    await deleteDoc(doc(db, "houses", id));

    deleted()
  }

  function handleShow(){
    setShow(!show)
  }

  async function handleSubmit(){
    const id = uuidv4();
    setLoading(!loading)

    handleUpload()

    console.log("Image ", i)

    await setDoc(doc(db, "houses", id), {
      id: id,
      address: address,
      name: name,
      country: country,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      type: type,
      image: image,
      surface: surface,
      date: date,
      price: price,
      description: description,
    });

    added()
    setLoading(!loading)
    setShow(!show)
  }

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src="https://plus.unsplash.com/premium_photo-1672872328377-65f2eefcb5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBwZXJzb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                  <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                    Edit profile
                  </MDBBtn>
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">Big Steppa</MDBTypography>
                  <MDBCardText>Bamenda</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">15</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Uploaded</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">4</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Sold</MDBCardText>
                  </div>
                  <div>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">Manage Estates</p>
                  <button className='btn btn-success' onClick={handleShow}>Add A House</button>
                  {show && 
                  <div>
                  <Form>
                    <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Address</Form.Label>
                      <Form.Control required onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address" />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Name</Form.Label>
                      <Form.Control required onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>City</Form.Label>
                      <Form.Control required onChange={(e) => setCountry(e.target.value)} type="text" placeholder="City" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Number of rooms</Form.Label>
                      <Form.Control required onChange={(e) => setBedrooms(e.target.value)} type="number" />
                    </Form.Group>
                    <Form.Group  className="mb-3">
                    <Form.Label>
                      Type of estate
                    </Form.Label>
                    <Form.Select required onChange={(e) => setType(e.target.value)} aria-label="Default select example">
                      <option>Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="studio">Studio</option>
                    </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Number of bathrooms</Form.Label>
                      <Form.Control onChange={(e) => setBathrooms(e.target.value)} type="number"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Image</Form.Label>
                      <Form.Control onChange={(e) => setImage(e.target.value)} type="file"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Surface</Form.Label>
                      <Form.Control onChange={(e) => setSurface(e.target.value)} type="number" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Date</Form.Label>
                      <Form.Control onChange={(e) => setDate(e.target.value)} type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Price</Form.Label>
                      <Form.Control onChange={(e) => setPrice(e.target.value)} type="number" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Description</Form.Label>
                      <Form.Control onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} />
                    </Form.Group>
                    <Button onClick={handleSubmit} className='btn btn-primary'>{loading ? "Loading..." : "Submit"}</Button>
                  </Form>
                </div>
                  }
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                  <MDBTable align='middle'>
                    <MDBTableHead>
                      <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>Deactivate</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>City</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {console.log(houses)}
                      {houses && houses.map((item, index) => 
                        <tr>
                        <td>
                          <div className='d-flex align-items-center'>
                            <img
                              src={item.image}
                              alt=''
                              style={{ width: '45px', height: '45px' }}
                              className='rounded-circle'
                            />
                            <div className='ms-3'>
                              <p className='fw-bold mb-1'>{item.name}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          {item.address}
                        </td>
                        <td>
                          <button className='btn btn-danger' onClick={(e) => handleDelete(item.id)}>
                            Deactive
                          </button>
                        </td>
                        <td>{item.price}</td>
                        <td>
                          <MDBBtn color='link' rounded size='sm'>
                            {item.country}
                          </MDBBtn>
                        </td>
                      </tr>
                      )}
                    </MDBTableBody>
                  </MDBTable>
                  </div>
                </div>
                {isLoading && <div>We are loading data...</div>}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                  <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                </div>
                <MDBRow>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="g-2">
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}