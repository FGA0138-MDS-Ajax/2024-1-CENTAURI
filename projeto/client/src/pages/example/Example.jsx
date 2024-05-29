import React, { useEffect, useState } from 'react';

function Example() {
    const [examples, setExamples] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/api/example')
            .then(response => response.json()) // Ensure the response is parsed as JSON
            .then(data => {
                console.log(data);
                setExamples(data); // Set the parsed JSON data to the state
            })
            .catch(error => console.error('Error fetching examples:', error));
    }, []);

    useEffect(() => {
        document.title = "Example Page";
    }, []);

    let handlePost = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/example/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    example: inputValue
                })
            });
            const data = await response.json();
            console.log('POST response:', data);
            setExamples([...examples, data]);
            setInputValue('');
        } catch (error) {
            console.error('Error posting example:', error);
        }
    };
    return (
        <div>
            <h1>Example</h1>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter a new example"
                />
                <button onClick={handlePost}>Submit</button>
            </div>
            {
                Array.isArray(examples) ? (
                    examples.map((example) => (
                        <div key={example.exampleID}>
                            <ul>
                                <li>{example.example}</li>
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No examples found.</p>
                )
            }
        </div>
    );
}

export default Example;
