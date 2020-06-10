import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

import Modal from '../Modal';
import { ModalContent } from './styles';
import api from '../../services/api';
import { latLng } from 'leaflet';

interface IPoints {
  id: string;
  image: string;
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  image_url  : string;  
}

interface IModalPoints {
  id: string;
  image: string;
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  image_url  : string;  
  items: {
    title: string;
  }
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  points: IPoints;
}

interface IItems{  
  title: string;
  id: number;
}

const ModalPoint: React.FC<IModalProps> = ({
    isOpen,
    setIsOpen,
    points
  }) => {
    const [items, setItems] = useState<IItems[]>([]);    
    const {id} = points;    
    const position = latLng(points.longitude, points.latitude);

    useEffect(() => {
      async function loadItems(): Promise<void>{        
        console.log(id);
        if(id){
          console.log(id);
          const response = await api.get(`/points/${id}` );
        
          setItems(response.data.items);  
        }
      }      
      loadItems();
      
    }, [id]);
    
    return (
      <Modal  isOpen={isOpen} setIsOpen={setIsOpen}>
        <ModalContent>
          <div className="content">
            <div className="firstColumn">
              <img src={points.image_url} alt=""/>
            </div>
            <div className="secondColumn">
              <h1>{points.name}</h1>
              <div className="description">

                <p>{points.city} - {points.uf}</p>

                <div className="footer">
                  <div className="whatsapp">
                    <p>Whatsapp: {points.whatsapp}</p>
                  </div>
                  <div className="mail">
                    <p>Email: {points.email}</p>
                  </div>
                </div>                

              </div>

              <Map center={position} zoom={17} >
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"            
                />            
              </Map>              

              <div className="list-items">
                <strong>Itens:</strong>
                <div className="item">
                  { items && 
                    items.map(item => ( 
                      <p key={item.id} >{item.title}</p>
                    ))
                  }
                </div>
              </div>
            </div>          

          </div>
          </ModalContent>
      </Modal>
    )
}

export default ModalPoint;