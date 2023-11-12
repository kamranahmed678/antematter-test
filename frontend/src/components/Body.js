import React, { useState, useEffect,useRef } from "react";
import { getHelp,getAbout } from "../services/general";
import { getPrice } from "../services/crypto";
import { uploadCsv,deleteCsv,drawChart } from "../services/file";
import { LineChart, Line, XAxis, CartesianGrid, Tooltip } from 'recharts';


const Terminal = () => {
    // State variables for managing input, output, file, and selected commands
    const [input, setInput] = useState(""); // Manages user input in the terminal
    const [output, setOutput] = useState([]); // Contains terminal output
    const bodyRef = useRef(); // Reference to the terminal body
    const fileInputRef = useRef(null); // Reference to the file input element
    const [file, setFile] = useState(null); // Manages uploaded file
    const [currentSelectedCommand, setCurrentSelectedCommand] = useState(null); // Tracks the currently selected command

    // Function to trigger file input when upload is clicked
    const uploadFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Simulates a click on the file input element
        }
        return { success: true }; // Placeholder return indicating a successful trigger
    };

    // Function to handle changes in the file input
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Retrieves the selected file from the 
        console.log(file)
        if (file) {
            setFile(file); // Sets the selected file in the state
        }
        e.target.value = null;
    };

    function parseCommand(command) {
        // Regular expression to match either a sequence of characters without spaces or a sequence enclosed in double quotes
        const regex = /[^\s"]+|"([^"]*)"/gi;
        const parts = []; // Array to store the individual parts of the command
        let match; // Variable to hold the current match
        
        do {
            match = regex.exec(command); // Executing the regex on the command string
            
            // If a match is found
            if (match != null) {
                // If the captured group exists (i.e., content within double quotes), push that content into the parts array
                parts.push(match[1] ? match[1] : match[0]);
            }
        } while (match != null); // Continue looping until no further matches are found
        
        return parts; // Return the array containing the parsed parts of the command
    }    

    const commandFunctions = {
        help: getHelp,
        about: getAbout,
        upload: uploadFile,
    };

    const getResult = async (command) => {
        const commandParts = parseCommand(command); // Parsing the command into parts
        const tempOutput = [{ type: "input", text: `${input}` }]; // Temporary output array
    
        if (commandFunctions[command]) { // Checking if a specific command exists in the commandFunctions object
            const res = await commandFunctions[command](); // Executing the function associated with the command
            if(res.success)
            {
                // Handling specific actions for 'help' and 'about' commands
                // Adding related outputs to tempOutput and updating setOutput
                if(command==="help")
                {
                    tempOutput.push({type:"output",text:`Available commands:`})
                    Object.keys(res.commands).forEach((key) => {
                        tempOutput.push({ type: "output", text: `- ${key}: ${res.commands[key]}` });
                    });
                    setOutput(prevOutput => [...prevOutput, ...tempOutput]);
                }
                else if (command==="about")
                {
                    tempOutput.push({type:"output",text: `CLI Version ${res.about.version}`})
                    tempOutput.push({type:"output",text: `${res.about.description}`})
                    setOutput(prevOutput => [...prevOutput, ...tempOutput]);
                }
            }
        }
        else if (commandParts.length===2)
        {
            // Handling commands with 2 parts
            // Executing actions based on the command type (e.g., fetch-price, delete)
            if(commandParts[0]=="fetch-price"){
                const pair=commandParts[1].replace('/', '');
                const res=await getPrice(pair)
                if(res.success){
                    tempOutput.push({type:"output",text: `The current price of ${commandParts[1]} is ${res.price}`})
                }
                else{
                    tempOutput.push({type:"output",text: `${res.message}`})
                }
                setOutput(prevOutput => [...prevOutput, ...tempOutput]);
            }
            else if(commandParts[0]=="delete"){
                const res=await deleteCsv(commandParts[1])
                if(res.message){
                    tempOutput.push({type:"output",text: `${res.message}`})
                }
                setOutput(prevOutput => [...prevOutput, ...tempOutput]);
            }
        }
        else if (commandParts.length===4){
            // Handling commands with 4 parts (e.g., draw)
            // Performing actions based on the 'draw' command
            if(commandParts[0]=="draw"){
                const data={
                    fileName:commandParts[1],
                    column1:commandParts[2],
                    column2:commandParts[3]
                }
                const res=await drawChart(data)
                if(!res.success){
                    tempOutput.push({type:"output",text: `${res.message}`})
                }
                else{
                    tempOutput.push({type:"chart",text: res.data})
                }
                setOutput(prevOutput => [...prevOutput, ...tempOutput]);
            }
        }
        else{   
            // If the command doesn't match any conditions above
            tempOutput.push({type:"output",text:"Command not recognized"})
            setOutput(prevOutput => [...prevOutput, ...tempOutput]);
        }
    };

    

    useEffect(() => {
        // Function to handle keydown events
        const handleKeyDown = async (e) => {
            if(e.key==="ArrowUp"){
                if(output.length>0){
                    let lastIndex=currentSelectedCommand
                    if(currentSelectedCommand===null){
                        for (let i = output.length - 1; i >= 0; i--) {
                            if (output[i].type === "input") {
                                lastIndex = i;
                                break;
                            }
                        }
                    }
                    else{
                        for (let i = lastIndex-1; i >= 0; i--) {
                            if (output[i].type === "input") {
                                lastIndex = i;
                                break;
                            }
                        }
                    }
                    setInput(output[lastIndex].text)
                    setCurrentSelectedCommand(lastIndex)
                }
            }
            else if(e.key==="ArrowDown"){
                if(output.length>0){
                    let lastIndex=currentSelectedCommand
                    if(currentSelectedCommand!=null){
                        for (let i = lastIndex+1; i <= output.length-1; i++) {
                            if (output[i].type === "input") {
                                lastIndex = i;
                                break;
                            }
                        }
                        setInput(output[lastIndex].text)
                        setCurrentSelectedCommand(lastIndex)
                    }
                }
            }
            else if (e.key === "Enter") {
                const result= await getResult(input);
                setCurrentSelectedCommand(null)
                setInput("");
            } else if (e.key === "Backspace") {
                setInput((prevInput) => prevInput.slice(0, -1));
                setCurrentSelectedCommand(null)
            } else if (e.key.length === 1) {
                setInput((prevInput) => prevInput + e.key);
            }
        };
    
        // Function to handle paste event
        const handlePaste=async (e)=>{
            let data = (e.clipboardData).getData('text/plain');
            setInput((prevInput) => prevInput.slice(0, -1) + data);
        }
    
        // Adding event listeners for keydown and paste events
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener('paste', handlePaste)
    
        // Removing event listeners when the component unmounts or when dependencies change
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("paste", handlePaste)
        };
    }, [input, output]);
    


    const outputUI = output.map((item, index) => {
        if (item.type === "input") {
            // For items of type "input", it creates a div representing the user input
            return (
                <div className="old-input" key={index} style={{ marginTop: index !== 0 ? "20px" : "0px" }}>
                    <p className="linebreak-del">~</p>
                    <p>
                        <span className="mr-1 text-green-400">&gt;</span>
                        {item.text}
                    </p>
                </div>
            );
        } else if (item.type === "output") {
            // For items of type "output", it creates a div displaying the output
            return <div className="one-output" key={index}>{item.text}</div>;
        } else if (item.type === "chart") {
            // For items of type "chart", it creates a LineChart component to display a chart
            return (
                <LineChart
                    width={730}
                    height={250}
                    data={item.text}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <XAxis dataKey="name" />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            );
        }
        // Returning null for any unknown item type
        return null;
    });
    
    
    // Automatically scrolls to the bottom of the output container whenever the output changes
    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [outputUI]);

    console.log(file)
    // Monitors the 'file' state, triggers an upload process when a file is present
    useEffect(() => {
        // Function to handle file upload
        const upload = async () => {
            let data = new FormData();
            data.append('file', file);
            
            // Temporary output for the upload process
            const tempOutput = [{ type: "input", text: `upload` }];

            try {
                const res = await uploadCsv(data);
                if (res.message) {
                    // If there is a response message, update the output with it
                    tempOutput.push({ type: "output", text: `${res.message}` });
                    // Append the temporary output to the existing output
                    setOutput(prevOutput => [...prevOutput, ...tempOutput]);
                    setFile(null)
                }
            } catch (err) {
                console.log(err); // Log any error that occurs during the upload
            } finally {
                setFile(null); // Reset the 'file' state after upload attempt, whether successful or not
            }
        };

        // Initiates the upload process if a file is present
        if (file !== null) {
            upload();
        }
    }, [file]);


    return (
        <div
            ref={bodyRef}
            className="bg-cover bg-no-repeat w-full overflow-y-auto body">
            <input
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <div className="absolute z-10 w-full bg-black opacity-70 terminal-overlay">
            </div>
            <div className="relative z-50">
                {outputUI.length>0 && <div className="terminal-output">{outputUI}</div>}
                <div className="terminal-input">
                    <p className="linebreak-del">~</p>
                    <p className="text-green-600 m-0"><span className="mr-1 text-green-400">&gt;</span>{input}{<span className=" cursor ml-0.25 text-blue-500">|</span>}</p>
                </div>
            </div>
        </div>
    );
};

export default Terminal;
