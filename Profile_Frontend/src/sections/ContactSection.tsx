import React, { useEffect, useRef, useState, type JSX } from "react";
import '../styles/Contact.css';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaFacebook, FaGithub, FaPhone } from "react-icons/fa";


export default function Contact() {

    interface ContactDataType{
        Id: number;
        Type: string;
        Name: string;
        // Title: string;
        Value: string;
        Icon: string;
        IsVisible: boolean;
    }
    // Render danh sách động
    const iconMap: Record<string, JSX.Element> = {
        FaEnvelope: <FaEnvelope className="contact-icon" />,
        FaPhone: <FaPhone className="contact-icon" />,
        FaFacebook: <FaFacebook className="contact-icon" />,
        FaGithub: <FaGithub className="contact-icon" />
    };

    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus]= useState('');
    const messageRef = useRef<HTMLTextAreaElement>(null);
    const [ContactData, setContactData] = useState<ContactDataType[] | null>(null);
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState<string | null>(null);
    // Lấy dữ liệu contact từ backend
    useEffect(() => {

        const fetchContactData= async()=>{
            try{
                const response= await fetch('http://localhost:5000/api/contacts');

                if(!response.ok){
                    throw new Error(`Lỗi tải dữ liệu: ${response.statusText}`);
                }
                const data = await response.json();
                setContactData(data || []);

            }
            catch(err:any){
                console.error('Error fetching contact data:', err);
                setError(err.message);
            }
            finally{
                setLoading(false);
            }
        }
        fetchContactData();
    }, []);

    // Gọi auto resize khi mount và mỗi khi input thay đổi
    useEffect(() => {
        if (messageRef.current) {
            autoResize();

            messageRef.current.addEventListener('input', autoResize);
            return () => {
                messageRef.current?.removeEventListener('input', autoResize);
            };
        }
    }, []);

    // Xử lý trạng thái loading 
    if (loading){
        return(
        <section className="hero" id="hero">
            <div className="container loading-wrap">
            <p>Loading...</p>
            </div>
        </section>
        )
    }
    // Xử lý trạng thái lỗi
    if(error){
        return(
        <section className="hero" id="hero">
            <div className="container error-wrap">
            <p>Error: {error}</p>
            </div>
        </section>
        )
    }

    // Hàm auto resize textarea
    const autoResize = () => {
        if(messageRef.current){
            messageRef.current.style.height = 'auto';
            messageRef.current.style.height = messageRef.current.scrollHeight + 'px';
        }
    };



    // Gửi Email bảng emailJS
    const sentEmail=(e: React.FormEvent)=>{
        e.preventDefault();

        if (formRef.current){
            emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then((result)=>{
                console.log(result.text);
                setStatus('Message sent successfully!');
                if (formRef.current){
                    formRef.current.reset();
                }
            })
            .catch((error)=>{
                console.log(error.text);
                setStatus('Failed to send the message. Please try again later.');
            });
        }
    }

    return(
        <section className="contact" id="contact">
            <div className="container">
                <div className="contact-head">
                    <h2 className="container-title">Get In Touch</h2>
                    <p className="container-intro">
                        I'm always open to new opportunities, exciting projects, or simply chatting about frontend, fullstack, or anything tech-related. <br/>
                        Feel free to drop me a message!
                    </p>
                </div>
                <div className="contact-grid">
                        {/* Contact Form */}
                    <div className="contact-form-wrap">
                        <form  ref={formRef} onSubmit={sentEmail} className="contact-form">
                            {/* First Name & Last Name */}
                            <div className="name-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input 
                                        type="text" 
                                        name="first_name" 
                                        placeholder="First Name" 
                                        required 
                                        />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input 
                                        type="text" 
                                        name="last_name" 
                                        placeholder="Last Name" 
                                        required 
                                        />
                                </div>
                            </div>
                            {/* Email */}
                            <div className="form-group">
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    name="user_email" 
                                    placeholder="you@company.com" 
                                    required 
                                    />
                            </div>
                            {/* Phone với icon cờ Việt Nam */}
                            <div className="form-group">
                                <label>Phone</label>
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    placeholder="+84 123 456 789" 
                                    required 
                                    />
                            </div>
                            {/* Message */}
                            <div className="form-group">
                                <label>Message</label>
                                <textarea 
                                    ref={messageRef}
                                    name="message" 
                                    rows={4}                  // chiều cao khởi đầu (khoảng 4 dòng)

                                    onInput={autoResize}      // Gọi auto resize khi nhập
                                    placeholder="Your Message" 
                                    required 
                                    >
                                </textarea>
                            </div>

                            <button type="submit" className="btn primary">Send</button>
                        </form>
                        {status && <p className="contact-status">{status}</p>}
                    </div>


            {/* Contact Information */}
                    <div className="contact-info">
                        <div className="info-card">
                            
                           {/* Chat Group */}
                            <div className="chat-group">
                                <p className="info-title">Chat with me</p>
                                <ul className="contact-list">
                                    {ContactData?.filter(c=> c.Type==="Chat").map(contact=>(
                                        <li key={contact.Id} className="info-item">
                                            {iconMap[contact.Icon] || <span className="contact-icon"></span>}
                                            <a href={
                                                contact.Name==="Email" ? `mailto:${contact.Value}` :contact.Value 
                                        
                                            } target="_blank">
                                                {contact.Name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>


                            {/* Call Group */}
                            <div className="call-group">
                                    <p className="info-title">Call me</p>
                                    <ul className="contact-list">
                                        {ContactData?.filter(c=>c.Type==="Call").map(contact=>(
                                            <li key={contact.Id} className="info-item">
                                                {iconMap[contact.Icon] || <span className="contact-icon"></span>}
                                                <a href={`tel:${contact.Value}`}>{contact.Name}</a>
                                            </li>
                                        ))}
                                    </ul>
                            </div>
                        

                            {/* Other Group */}
                            <div className="other-group">
                                <p className="info-title">Other</p>
                                <ul className="contact-list">
                                    {ContactData?.filter(c=> c.Type==="Other").map(contact=>(
                                        <li key={contact.Id} className="info-item">
                                            {iconMap[contact.Icon] || <span className="contact-icon"></span>}
                                            <a href={contact.Value} target="_blank">{contact.Name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}



    