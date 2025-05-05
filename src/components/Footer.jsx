import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Footer(){
    return (
        <>
            <footer>
                <div className="row">
                    <div className="col">
                        <h2>Ciao</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit necessitatibus modi sequi ab quod dolorum provident. Veniam iusto illo aut nam, voluptatem tenetur facere eum, quo dolorum enim magni?</p>
                    </div>
                    <div className="col">
                        <h3>Office <div className="underline"><span></span></div></h3>
                        <p>ITPL Road</p>
                        <p>whitefield, Bangalore</p>
                        <p>San Ferdinando di Puglia, 76017, Puglia</p>
                        <p className='email-id'>m@fake.com</p>
                        <h4>+39 - 3279746241</h4>
                    </div>
                    <div className="col">
                        <h3>Links <div className="underline"><span></span></div></h3>
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><a href="">Services</a></li>
                            <li><a href="">About Us</a></li>
                            <li><a href="">Features</a></li>
                            <li><a href="">Contracts</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3>Newsletter <div className="underline"><span></span></div></h3>
                        <form>
                        <FontAwesomeIcon className='mail' icon={faEnvelope}/>
                            <input type='email' placeholder='Inserisci la tua email' required></input>
                            <button type='submit'><FontAwesomeIcon className='arrow' icon={faArrowRight} /></button>
                        </form>
                    </div>
                </div>
                <hr />
                <p className='copyright'>Se vuoi usarmi pagami strunz</p>
            </footer>
        </>
    )
}

export default Footer