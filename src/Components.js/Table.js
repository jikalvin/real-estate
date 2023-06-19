import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

export default function Table({ data }) {
  return (
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
        {data.map((item, index) => 
          <tr>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
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
            <MDBBadge color='danger' pill>
              Deactive
            </MDBBadge>
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
  );
}