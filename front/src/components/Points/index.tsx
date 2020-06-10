import React from 'react';

import whatLogo from '../../assets/comments.svg';
import mailLogo from '../../assets/message.svg';

import './styles.css';

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

interface IProps{
  point:IPoints;
  handlePointModal: (point: IPoints) => void;
  openModal: () => void;
}

const Point: React.FC<IProps> = ({
    point,
    handlePointModal,
    openModal
  }:IProps) => {

  function showModalPoint():void{
    handlePointModal(point);
    openModal();
  }

  return (
    <div className="points" onClick={() => showModalPoint()}>
      <div className="card">
        <img src={point.image_url} alt={point.name}/>
        <div className="description">
          <strong>{point.name}</strong>

          <div className="footer">
            <div className="whatsapp">
              <img src={whatLogo} alt=""/><p>{point.whatsapp}</p>
            </div>
            <div className="mail">
              <img src={mailLogo} alt=""/><p>{point.email}</p>
            </div>
          </div>
        </div>      
      </div>
    </div>
  )
}

export default Point;