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

interface Items {
  id: number;
  title: string;
}

const Dashboard = () => {
  const [points, setPoints] = useState<IPoints[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pointsModal, setPointsModal] = useState<IPoints>({} as IPoints);

  const [items, setItems] = useState<Items[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // hook para obter todos os Pontos de coleta;
  useEffect(() => {
    async function loadPoints(): Promise<void>{
      console.log(selectedItems);
      const response = await api.get('/points',{
        params: {
          items: selectedItems
        }
      });

      setPoints(response.data);              
    }
    loadPoints();
    
  }, [selectedItems]);

  // hook para obter todos os Items
  useEffect(() => {
    async function loadItems(): Promise<void>{
      const response = await api.get('/items');

      setItems(response.data);
    }
    loadItems();
    
  }, []);
  
  function handleModal(point : IPoints){
    setPointsModal(point);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function handleSelectItem(id: number){
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if(alreadySelected >= 0){
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems(filteredItems);
    }else{

      setSelectedItems([...selectedItems, id]);
    }

  }

  function handleLimparTodos(){
    const emptySelection : number[] = [];
    
    setSelectedItems(emptySelection);
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
        <div className="listItems">
          <h2>Filtre por Items:</h2>
          <div className="list">
            {items && 
              items.map(item => (
                <div                   
                  key={item.id}
                  onClick={() => handleSelectItem(item.id)}  
                  className={selectedItems.includes(item.id)? 'outside-selected' : 'outside'}                    
                >
                  <p>
                    {item.title}
                  </p>
                </div>
              ))
            }
            <div 
              className="limpar"
              onClick={() => handleLimparTodos()}
            >Limpar Todos</div>
          </div>
        </div>
        
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