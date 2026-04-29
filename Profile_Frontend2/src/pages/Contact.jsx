import {useState, useRef} from "react";
import emailjs from "@emailjs/browser";
import IconRender from "../constants/icons";


const ContactForm=()=>{
    const formRef= useRef();
    const messageRef= useRef();
    const [isSending, setIsSending]= useState(false);
    const [status, setStatus]= useState("");

    const lat = import.meta.env.VITE_MAP_LAT ;
    const lng = import.meta.env.VITE_MAP_LNG ;
    const zoom = import.meta.env.VITE_MAP_ZOOM || 15;
    const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed&t=m`;

    /* Auto-resize function for the message textarea:
    1. Set the height to "auto" to reset any previous height
    2. Set the height to the scrollHeight to fit the content
    */
    const autoResize=()=>{
        if (messageRef.current) {
            messageRef.current.style.height="auto";
            messageRef.current.style.height= messageRef.current.scrollHeight + "px";
        }
    }

    /* Email processing function:
    1. Block the default form submission behavior
    2. Set the sending state
    3. Use emailJs to send the email with the form data 
        EmailJS requires:
        - service ID
        - template ID
        - form reference
        - public key
    4. Handle the resonse:
        - On success: Log the result and reset the form
        - On error: Log the error
    5. Finally, reset the sending state
    */
    const SERVICE_ID= import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID= import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY= import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const sendEmail=(e)=>{
        e.preventDefault();
        setIsSending(true);

        emailjs.sendForm(
            SERVICE_ID,
            TEMPLATE_ID,
            formRef.current,
            PUBLIC_KEY
        ).then(()=>{
            setStatus("SUCCESS");
            formRef.current.reset();
            if(messageRef.current){
                messageRef.current.style.height="auto";
            }
        }).catch(()=>{
            setStatus("ERROR");

        }).finally(()=>{
            setIsSending(false);
            setTimeout(()=>{    
                setStatus("");
            }, 5000);
        });
    }
    
    return(
        <section className="mt-10  ">

            {/* PHẦN BẢN ĐỒ */}
            <section className="mb-10 w-full overflow-hidden rounded-[20px] border border-[#333] shadow-lg">
                <div className="relative w-full h-[300px] rounded-[20px] overflow-hidden border border-[#333] shadow-lg  group">
                    <iframe
                        title="Google Map"
                        src={mapSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        // Hiệu ứng Dark Mode bằng CSS Filter để Portfolio trông Senior hơn
                        className="grayscale invert opacity-70 contrast-125 transition-all duration-500 "
                    ></iframe>
                    
                    {/* Nút hỗ trợ mở trực tiếp trong Google Maps App */}
                    <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute bottom-4 right-4 bg-[#1e1e1f]/80 backdrop-blur-md text-[#ffdb70] px-4 py-2 rounded-lg text-sm border border-[#333] hover:bg-[#ffdb70] hover:text-black transition-all"
                    >
                        View on Google Maps
                    </a>
                </div>
            </section>

            <h3 className="text-2xl font-bold mb-4">Contact Form</h3>
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                    {/* FirstName and LastName */}
                <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
                    <div className="relative group">
                        <input 
                            type="text"
                            name="firstName"
                            placeholder=" " 
                            required 
                            className="peer w-full bg-[#1e1e1f] border border-[#333] text-white rounded-[15px] p-4 outline-none focus:border-[#ffdb70] transition-colors
                                        invalid:not-placeholder-shown:border-red-500 
                                        invalid:not-placeholder-shown:text-red-500
                        "/>
                        <label className="absolute left-4 top-4 text-gray-400 pointer-events-none transition-all
                        peer-focus:-top-2.5 peer-focus: left-3 peer-focus:text-sm peer-focus:text-[#ffdb70] peer-focus:bg-[#1e1e1f] peer-focus:px-1 peer-focus:rounded-sm
                        peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#1e1e1f] peer-[:not(:placeholder-shown)]:px-1
                        peer-[:not(:placeholder-shown)]:peer-invalid:text-red-500
                        ">
                            FirstName
                        </label>
                    </div>
                    
                    <div className="relative group">
                        <input 
                            type="text"
                            name="lastName"
                            placeholder=" " 
                            required 
                            className="peer w-full bg-[#1e1e1f] border border-[#333] text-white rounded-[15px] p-4 outline-none focus:border-[#ffdb70] transition-colors
                                        invalid:not-placeholder-shown:border-red-500 
                                        invalid:not-placeholder-shown:text-red-500
                        "/>
                        <label className="absolute left-4 top-4 text-gray-400 pointer-events-none transition-all
                        peer-focus:-top-2.5 peer-focus: left-3 peer-focus:text-sm peer-focus:text-[#ffdb70] peer-focus:bg-[#1e1e1f] peer-focus:px-1 peer-focus:rounded-sm
                        peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#1e1e1f] peer-[:not(:placeholder-shown)]:px-1
                        peer-[:not(:placeholder-shown)]:peer-invalid:text-red-500
                       ">
                            LastName
                        </label>
                    </div>
                </div>

                {/* Email */}
                <div className="relative group">
                    <input 
                        type="email"
                        name="email"
                        placeholder=" " 
                        required 
                        className="peer w-full bg-[#1e1e1f] border border-[#333] text-white rounded-[15px] p-4 outline-none focus:border-[#ffdb70] transition-colors
                                    invalid:not-placeholder-shown:border-red-500 
                                    invalid:not-placeholder-shown:text-red-500
                    "/>
                    <label className="absolute left-4 top-4 text-gray-400 pointer-events-none transition-all
                    peer-focus:-top-2.5 peer-focus: left-3 peer-focus:text-sm peer-focus:text-[#ffdb70] peer-focus:bg-[#1e1e1f] peer-focus:px-1 peer-focus:rounded-sm
                    peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#1e1e1f] peer-[:not(:placeholder-shown)]:px-1
                    peer-[:not(:placeholder-shown)]:peer-invalid:text-red-500
                    ">
                        Email
                    </label>
                </div>
                {/* Message */}
                <div className=" relative group">
                    <textarea 
                        name="message" 
                        id="message" 
                        ref={messageRef} 
                        placeholder=" "
                        required 
                        onInput={autoResize}
                        rows={4}
                        className="peer w-full bg-[#1e1e1f] border border-[#333] text-white rounded-[15px] p-2 outline-none focus:border-[#ffdb70] transition-colors resize-none h-24 overflow-hidden">
                    </textarea>
                    <label className="absolute left-4 top-4 text-gray-400 pointer-events-none transition-all
                        peer-focus:-top-2.5 peer-focus: left-3 peer-focus:text-sm peer-focus:text-[#ffdb70] peer-focus:bg-[#1e1e1f] peer-focus:px-1 peer-focus:rounded-sm
                        peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#1e1e1f] peer-[:not(:placeholder-shown)]:px-1
                    ">
                        Your Message
                    </label>
                </div>
                {/* Submit Button */}
                <div className="button">
                    <button 
                        type="submit"
                        disabled={isSending}
                        className="items-center bg-gradient-to-br from-[#383838] to-[#212121] text-[#ffdb70] p-3  rounded-[15px] font-medium shadow-md hover:from-[#404040] hover:to-[#212121] transition-all
                        disabled:bg-gray-400 disabled:cursor-not-allowed "
                    >
                        <span className="flex items-center gap-2">
                            {isSending ? (
                                <IconRender iconName="RiLoader2Fill" />
                            ) : (
                                <IconRender iconName="RiSendPlaneFill" />
                            )}
                            {isSending ? "Sending..." : "Send Message"}
                        </span>
                    </button>
                </div>
                {status && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        
                        <div className="absolute inset-0 bg-black/60 opacity-50 backdrop-blur-sm animate-fade-in" 
                            onClick={()=>setStatus("")}>
                    
                        </div>
                        {/* Cửa sổ thông báo chính */}
                        <div className="relative bg-[#1e1e1f] rounded-[15px] p-6 shadow-lg text-center animate-fade-in" >
                            {/* Icon */}
                            <div className={`mb-4 flex items-center justify-center ${status === "SUCCESS" ? "animate-pulse" : "animate-shake"}`}>
                                {status === "SUCCESS" ? (
                                    <IconRender iconName="FaKissWinkHeart" className="text-pink-500 text-3xl" />
                                ) : (
                                    <IconRender iconName="FaSadTear" className="text-red-500 text-3xl" />
                                )}
                            </div>
                            {/* Message */}
                            <div className="mb-6">
                                {status === "SUCCESS" ? (
                                    <p className=" text-lg font-semibold">
                                        <p>Thank you!</p>
                                        <p>Your message has been sent successfully!</p>
                                    </p>
                                ) : (
                                    <p className=" text-lg font-semibold">
                                        <p>Failed to send your message. </p>
                                        <p>Please try again later.</p>
                                    </p>
                                )}
                            </div>
                            {/* Close Button */}
                            <button 
                                className={`w-full py-3 rounded-[15px] font-semibold transition-all ${
                                    status === "SUCCESS" 
                                    ? "bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white" 
                                    : "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
                                }`}
                                onClick={() => setStatus("")}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                
            </form>
        </section>
    )
}
export default ContactForm;