import { useState } from "react";

const FormAddTimeline = ({ type, onAdd, setIsModalOpen }) => {

    const [newForm, setNewForm] = useState({
        Title: "",
        Description: "",
        Duration: "",
        Type: type
    });

    const handleChange= (e)=>{
        const { name, value } = e.target;
        setNewForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }
    const handleSubmit= (e)=>{
        e.preventDefault();
        onAdd(newForm);
        setNewForm({
            Title: "",
            Description: "",
            Duration: "", 
            Type: type
        });
    }

    return(
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                {/* Title Input */}
                <input
                    type="text"
                    name="Title"
                    placeholder="Title"
                    value={newForm.Title}
                    onChange={handleChange}
                    className="text-sm text-gray-100 font-bold outline-none pr-6 w-full"
                />
                {/* Description Input */}
                <input
                    type="text"
                    name="Description"
                    placeholder="Description"
                    value={newForm.Description}
                    onChange={handleChange}
                    className="text-sm text-[#C8A854] font-bold outline-none pr-6 w-full"
                />
                {/* Duration Input */}
                <textarea
                    type="text"
                    name="Duration"
                    placeholder="Duration"
                    value={newForm.Duration}
                    onChange={handleChange}
                    className="text-sm outline-none text-gray-300 pr-6 w-full resize-none h-[60px]"
                />
                <div className="mt-4 flex text-xs font-bold gap-4">
                    <button type="button" 
                            onClick={() => setIsModalOpen(false)} 
                            className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-500 transition-colors"
                            >
                            Cancel
                    </button>
                    <button type="submit" 
                            className="bg-[#ffdb70] text-gray-800 px-3 py-2 rounded-lg hover:bg-[#ffdb70]/80 transition-colors"
                            >
                            Add
                    </button>
                </div>

            </form>
        </div>
    )
}
export default FormAddTimeline;