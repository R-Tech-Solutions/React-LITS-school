import React, { useEffect, useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { backEndURL } from "../Backendurl";

const LecturersSection = () => {
    const [lecturers, setLecturers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLecturers = async () => {
            try {
                const response = await axios.get(`${backEndURL}/api/lecturers`);
                setLecturers(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching lecturers:", error);
                setLoading(false);
            }
        };

        fetchLecturers();
    }, []);

    if (loading) {
        return <p>Loading lecturers...</p>;
    }

    return (
        <section id="experts">
            <h1>Our Lecturers</h1>
            <p>
                Our lecturers are highly qualified professionals with years of experience in teaching languages. Passionate and
                dedicated, they bring innovative teaching methods to make language learning engaging, effective, and enjoyable
                for every student.
            </p>
            <div className="experts-box">
                <Marquee gradient={false} speed={50}>
                    {lecturers.map((lecturer, index) => (
                        <div className="profile" key={index}>
                            <img src={lecturer.image} alt={lecturer.name} />
                            <h6>{lecturer.name}</h6>
                            <p>{lecturer.subject}</p>
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default LecturersSection;
