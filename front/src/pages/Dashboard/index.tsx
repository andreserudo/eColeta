import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';

import Point from '../../components/Points';

import './styles.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import ModalPoint from '../../components/ModalPoint';

interface IPoints{
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

const Dashboard = () => {
  const [points, setPoints] = useState<IPoints[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pointsModal, setPointsModal] = useState<IPoints>({} as IPoints);

  useEffect(() => {
    async function loadPoints(): Promise<void>{
      const response = await api.get('/allpoints');

      setPoints(response.data);              
    }
    loadPoints();
    
  }, []);
  
  function handleModal(point : IPoints){
    setPointsModal(point);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }
  
  return (
    <>
      <ModalPoint 
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        points={pointsModal}
      />

      <div id="page-dashboard">

        <header>
          <img src={logo} alt="EColeta"/>

          <Link to="/">
            <FiArrowLeft />
            Voltar para home
          </Link>
        </header>

        <h1>Pontos de Coleta</h1>
        
        <div className="pointsContainer">
          {points &&
            points.map(point => (
              <Point 
                key={point.id}
                point={point}
                openModal={toggleModal}
                handlePointModal={handleModal}
              />
            ))
          }
        </div>
        
        <Map  zoom={17} >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"            
          />            
        </Map>
      </div>
    </>
  );
}

export default Dashboard;