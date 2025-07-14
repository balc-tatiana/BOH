import React from 'react'
import logo from '../../assets/images/logo.jpeg'
import media from '../../assets/images/insta.png'
import {Container, Row, Col, Stack, Image, Nav ,NavLink} from 'react-bootstrap'

const Footer = () => {
    return(
        <footer>
            <Container fluid >
                <Row className="text-white p-4" style={{ backgroundColor: '#536b1a' }}>
                    <Col className='mx-5'>
                       <Stack>
                            <Image src={logo} alt="logo" rounded width={150} height={150}>
                            </Image>
                            <h1>Snail Trail</h1>
                            <p>Every child deserves the chance to grow, learn, and be seen—no matter where they come from.</p>
                       </Stack>
                    </Col>
                    <Col>
                    <Nav className="flex-column fs-5">
                        <h2>Useful Links</h2>
                        <NavLink href="/home" className="text-white">Home</NavLink>
                        <NavLink href="/blog" className="text-white">About</NavLink>
                        <NavLink href="/activities" className="text-white">Activities</NavLink>
                        <NavLink href="/help" className="text-white">Help</NavLink>
                        </Nav>
                    </Col>
                    <Col>
                     <h4>Contact us</h4>
                     <a href="https://www.instagram.com/tatiana.0317?igsh=b3FwZXVkMjVmd214" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center">
                     <Image src={media} alt="logo" rounded width={40} height={40}
                     style={{
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.2)';
                        e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}>
                        </Image>
                        <p className="text-white mb-0 ms-2">snail_trail_founder</p>
                      </a>
                      <h4>Donate</h4>
                      <a>Support youth in Romania! Redirect 3.5% of your income tax to our app and help us create more opportunities.</a>
                     
                    </Col>
                </Row>
                </Container>
        </footer>


    );
};
export default Footer;
