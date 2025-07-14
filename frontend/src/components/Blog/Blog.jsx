import React from "react";
import Tatiana from "../../assets/images/Tatiana.jpeg";
import Alexia from "../../assets/images/Alexia.jpeg";

const Blog = () => {
  const names = ["Tatiana", "Alexia"];
  const photos = [Tatiana, Alexia];

  const descriptions = {
    Tatiana: [
      "Hi! I am Tatiana, a 17-year-old from Cluj-Napoca. I have a passion for joining projects and finding ways to make a contribution to this world. I use my artistic side—painting, reading, photographing, designing—and my love for science and technology.",
      "In this project, I mainly worked on the frontend of the app and implemented an AI chatbot that helps users. I’m happy I could turn my dreams into reality and build something that helps others."
    ],
    Alexia: [
      "Hello! My name is Alexia, I’m seventeen years old and I am keen on computer science. Photography and graphic art are also activities I enjoy.",
      "For this project, I worked on both frontend and backend, including creating the profile page and working with the MySQL database. I love applying what I learn and using it to help others find new opportunities."
    ]
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>SnailTrail</h1>
        <h2 style={{ fontSize: "1.5rem", color: "#555", marginBottom: "20px" }}>
          Un pas mic, o schimbare mare
        </h2>
      </div>

      {/* Introducere generală */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          margin: "30px auto",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          fontSize: "1.2rem",
          maxWidth: "1000px",
          textAlign: "center",
        }}
      >
        <p>
          SnailTrail is more than an app, it’s a mission to make extracurricular opportunities accessible to every child in Romania, no matter where they live. Created by high school girls from Cluj who experienced firsthand the lack of access to workshops and volunteering in rural areas, SnailTrail offers a personalized, intuitive platform designed with empathy and inclusion at its core.
        </p>
      </div>

      {/* Carduri echipă */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          margin: "50px auto",
          maxWidth: "1000px",
        }}
      >
        {names.map((name, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <h3>{name}</h3>
            <img
              src={photos[index]}
              alt={name}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            />
            {Array.isArray(descriptions[name]) &&
              descriptions[name].map((para, idx) => <p key={idx}>{para}</p>)}
          </div>
        ))}
      </div>

      {/* Compunere motivațională în engleză */}
      <div
        style={{
          marginTop: "60px",
          padding: "30px",
          backgroundColor: "#e6f7ff",
          borderRadius: "10px",
          maxWidth: "1000px",
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: "1.1rem",
          lineHeight: "1.7",
        }}
      >
        <p>
          We believe talent is everywhere, but opportunity is not. Children in rural areas often grow up without access to extracurricular activities, workshops, or volunteering projects that could inspire them or help shape their future. As students who grew up seeing this gap, we knew we had to do something. SnailTrail is our response — a way to bring information, inspiration, and opportunity to places often left behind.
        </p>
        <p>
          We are motivated by the belief that education doesn’t only happen in classrooms. A child’s potential shouldn’t be limited by their location. We want to empower kids to discover their passions, connect with mentors, and get involved in causes they care about — all through a platform that speaks their language, meets their needs, and respects their challenges.
        </p>
        <p>
          Imagine a 14-year-old girl in a small village discovering a coding workshop 100km away — and actually being able to go. Or a boy finding an online art contest that helps him believe in his talent. These are the stories we’re building towards. SnailTrail isn’t just an app — it’s a bridge. Between villages and cities, between ambition and opportunity, between isolation and community.
        </p>
      </div>
    </div>
  );
};

export default Blog;
