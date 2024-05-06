import { useState } from "react";
import { useParams } from "react-router-dom";

const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    // Add more options as needed
];

const AddMoney = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const {uid} = useParams();
    console.log(uid);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className='w-1/2 mx-auto mt-28'>
            <h1 className="text-5xl font-bold mb-4 text-center">To Add Money Be Careful</h1>
        


            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <select>
                    {options
                        .filter((option) =>
                            option.label.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                </select>
            </div>



        </div>
    );
};

export default AddMoney;