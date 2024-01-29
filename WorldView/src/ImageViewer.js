import Modal from 'react-bootstrap/Modal';
import "./ImageViewer.css"

function ImageViewer(props){
    var showModal = props.image != null



    return <Modal size="xl" fullscreen="md-down" centered show={showModal} onHide={() => { props.setImage(null) }} >
                <div className="closeButton" onClick={() => { props.setImage(null) }}>
                    <img src="./X.png" />
                </div>
                <div className='modalMediaContainer'>
                    <img className='modalMedia' src={props?.image?.urls?.regular}  />
                </div>
                <h3>{props?.image?.location?.name}</h3>
           </Modal>


}
export default ImageViewer