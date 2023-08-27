import React from 'react';
import {Container} from "@mui/material";
import {Col, Row} from "react-bootstrap";

const Error = () => {
    return (
        <div>
            <Container className="mt-5">
                <Row>
                    <Col md={6} className="mx-auto text-center">
                        <h1 className="display-4">404</h1>
                        <p className="lead">Oops! Page not found.</p>
                        <p>Sorry, but the page you are looking for does not exist.</p>
                    </Col>
                </Row>
            </Container>

        </div>
    );
};

export default Error;