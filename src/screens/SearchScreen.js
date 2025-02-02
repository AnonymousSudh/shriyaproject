// src/SearchScreen.js
import React, { useState } from 'react';
import styles from '../styles/SearchScreen.css';
import ResponseCodecard from "../Compnents/card/ResponseCodeCard"
import { useNavigate } from 'react-router-dom';


const httpCodes = {
    100: "Continue",
    101: "Switching Protocols",
    102: "Processing",
    103: "Early Hints",
    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non-Authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    207: "Multi-Status",
    208: "Already Reported",
    226: "IM Used",
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    306: "Switch Proxy",
    307: "Temporary Redirect",
    308: "Permanent Redirect",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "I'm a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Entity",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required"
};

function SearchScreen() {
    const [prefix, setPrefix] = useState('');
    const [filteredCodes, setFilteredCodes] = useState([]);
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const newPrefix = e.target.value;
        setPrefix(newPrefix);

        if (newPrefix) {
            const matchingCodes = Object.keys(httpCodes)
                .filter(code => code.startsWith(newPrefix))
                .map(code => parseInt(code));
            setFilteredCodes(matchingCodes);
        } else {
            setFilteredCodes([]);
        }
    };

    return (
        <div className='searchContainer'>
            <div className='searchBoxParent'>
                <div className='searchBox'>
                    <h2>Search HTTP Dog</h2>
                    <input
                        type="text"
                        value={prefix}
                        onChange={handleInputChange}
                        placeholder="Enter HTTP response code prefix"
                        className='input'
                    />
                </div>
                <div className='buttonContainer'>
                    <button onClick={() => {navigate('/ListingScreen') }}>Show All Listing</button>
                </div>
            </div>
            <div className='results'>
                {filteredCodes.map(code => (
                    <ResponseCodecard key={code} code={code} name={httpCodes[code]} />
                ))}
            </div>
        </div>
    );
}

export default SearchScreen;