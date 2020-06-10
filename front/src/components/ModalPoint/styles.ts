import styled from 'styled-components';

export const ModalContent = styled.div`
  display:flex;

  .content{
    margin:0;
    padding:0;
    width: 100%;

    display: flex;
  }

  .content .firstColumn {
    display: flex;
    flex-direction: column;

    width: 50%;
    align-items: center;
  }

  .content .firstColumn img{
    height: 300px; 
    width: 300px;
  } 


  .content .secondColumn{
    display: flex;
    flex-direction: column;

    width: 50%;
    align-items: center;
    justify-content: center;
  }

  .content .secondColumn h1{
    width: 100%;
  }

  .content .secondColumn .description{  
    width: 100%;
    display: flex;
    flex-direction: column;    

    margin-top: 10px;
    margin-bottom: 15px;
  }

  .content .secondColumn .list-items{
    display: flex;
    margin: 0;
    width: 100%;

    justify-content: start;
    flex-direction: column;
  }

  .content .secondColumn .list-items strong{
    color: rgb(113, 113, 113);
  }

  .content .secondColumn .list-items .item{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 5px;
    gap: 5px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }  

  .content .secondColumn .list-items .item p{    
    border: 1px solid #dcdcdc;    
	  text-align: center;
  }


`;